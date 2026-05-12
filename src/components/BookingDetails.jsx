/**
 * BookingDetails Component
 * Displays a list of bookings overlapping the selected date range.
 */
const BookingDetails = ({ selectedRange, bookings }) => {
  if (!selectedRange.start) {
    return (
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-8 text-center h-full flex flex-col justify-center items-center">
        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h4 className="text-slate-300 font-bold">No selection</h4>
        <p className="text-slate-500 text-xs mt-2 max-w-[200px]">
          Click or drag on the calendar to view booking details.
        </p>
      </div>
    );
  }

  const startDate = selectedRange.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endDate = selectedRange.end ? selectedRange.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : startDate;
  const isSingleDay = !selectedRange.end || startDate === endDate;

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden h-[580px] flex flex-col shadow-2xl">
      <div className="p-4 bg-slate-800/30 border-b border-slate-800">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
          Stay Details
        </h4>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
          {startDate} {!isSingleDay && `— ${endDate}`}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide hover:scrollbar-default [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-700 transition-colors">
        {bookings.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-slate-500 text-sm italic">No bookings found for this range.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-[#1e293b] border border-slate-800 rounded-lg p-3 hover:border-slate-600 transition-colors group">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {booking.guestName}
                  </h5>
                  <p className="text-[10px] text-slate-400 font-medium">Room {booking.roomNumber} • {booking.roomType}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {booking.status}
                </span>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-slate-900/50 p-2 rounded">
                  <p className="text-slate-500 uppercase tracking-tighter font-bold">Check-In</p>
                  <p className="text-slate-300 font-medium">{booking.checkIn}</p>
                </div>
                <div className="bg-slate-900/50 p-2 rounded">
                  <p className="text-slate-500 uppercase tracking-tighter font-bold">Check-Out</p>
                  <p className="text-slate-300 font-medium">{booking.checkOut}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 bg-slate-800/10 border-t border-slate-800">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">{bookings.length} Results Found</span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
