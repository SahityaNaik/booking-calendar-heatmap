import { useState, useMemo } from 'react';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import StatsHeader from './components/StatsHeader';
import BookingDetails from './components/BookingDetails';
import { useBookings } from './hooks/useBookings';
import { useCalendarSelection } from './hooks/useCalendarSelection';
import { getDaysInMonthGrid } from './utils/calendarUtils';
import { calculateMonthlyStats, getTrendIndicator } from './utils/statsUtils';
import { getBookingsInRange } from './utils/occupancyUtils';

function App() {
  const [viewDate, setViewDate] = useState(new Date(2026, 1, 1)); 
  const { bookings, loading, error } = useBookings();
  const selection = useCalendarSelection();

  // Derived state: Grid cells
  const calendarGrid = useMemo(() => 
    getDaysInMonthGrid(viewDate.getFullYear(), viewDate.getMonth()), 
    [viewDate]
  );

  // Derived state: Monthly statistics
  const monthlyStats = useMemo(() => 
    calculateMonthlyStats(bookings, viewDate.getFullYear(), viewDate.getMonth()),
    [bookings, viewDate]
  );

  // Derived state: Trend (comparing to previous month)
  const prevMonthStats = useMemo(() => {
    const prevDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    return calculateMonthlyStats(bookings, prevDate.getFullYear(), prevDate.getMonth());
  }, [bookings, viewDate]);

  const trend = useMemo(() => getTrendIndicator(monthlyStats, prevMonthStats), [monthlyStats, prevMonthStats]);

  // Derived state: Bookings overlapping selection
  const selectedBookings = useMemo(() => 
    getBookingsInRange(bookings, selection.selectionStart, selection.selectionEnd),
    [bookings, selection.selectionStart, selection.selectionEnd]
  );

  const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  const handleToday = () => setViewDate(new Date());

  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="bg-[#0f172a] border border-rose-500/20 rounded-xl p-8 max-w-md text-center shadow-2xl">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Data Fetch Error</h2>
          <p className="text-slate-400 mt-2 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Booking <span className="text-indigo-500">Heatmap</span>
          </h1>
          <p className="text-slate-400 mt-1">Real-time occupancy and booking insights.</p>
        </header>

        <main className="space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              <p className="text-slate-500 font-medium text-sm animate-pulse">Fetching latest booking data...</p>
            </div>
          ) : (
            <>
              <StatsHeader stats={monthlyStats} trend={trend} />
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Calendar View */}
                <div className="lg:col-span-3">
                  <section className="bg-[#0f172a] rounded-xl shadow-2xl border border-slate-800 overflow-hidden">
                    <CalendarHeader 
                      viewDate={viewDate}
                      onPrev={handlePrevMonth}
                      onNext={handleNextMonth}
                      onToday={handleToday}
                    />
                    <CalendarGrid 
                      days={calendarGrid}
                      bookings={bookings}
                      selection={selection}
                      onMouseDown={selection.startSelection}
                      onMouseEnter={selection.updateSelection}
                      onMouseUp={selection.endSelection}
                    />
                  </section>
                </div>

                {/* Side Panel: Booking Details */}
                <div className="lg:col-span-1 h-[600px] lg:h-auto">
                  <BookingDetails 
                    selectedRange={{ start: selection.selectionStart, end: selection.selectionEnd }} 
                    bookings={selectedBookings} 
                  />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
