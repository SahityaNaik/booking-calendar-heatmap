import { useState, useMemo } from 'react';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import { useBookings } from './hooks/useBookings';
import { useCalendarSelection } from './hooks/useCalendarSelection';
import { getDaysInMonthGrid } from './utils/calendarUtils';

function App() {
  // 1. Core State: The month we are currently viewing
  const [viewDate, setViewDate] = useState(new Date(2026, 1, 1)); // Start at Feb 2026 as per sample data

  // 2. Custom Hooks
  const { bookings, loading, error } = useBookings();
  const selection = useCalendarSelection();

  // 3. Derived State: The 42-day grid for the current view
  const calendarGrid = useMemo(() => {
    return getDaysInMonthGrid(viewDate.getFullYear(), viewDate.getMonth());
  }, [viewDate]);

  // 4. Navigation Handlers
  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setViewDate(new Date());
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Oops!</h1>
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
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
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
