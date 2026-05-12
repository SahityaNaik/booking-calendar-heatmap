/**
 * CalendarHeader Component
 * Displays the current month/year and navigation controls.
 */
const CalendarHeader = ({ viewDate, onPrev, onNext, onToday }) => {
  const monthName = viewDate.toLocaleString('default', { month: 'long' });
  const year = viewDate.getFullYear();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-white">
          {monthName} <span className="text-slate-500 font-medium">{year}</span>
        </h2>
        <button
          onClick={onToday}
          className="ml-4 px-3 py-1 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors"
        >
          Today
        </button>
      </div>

      <div className="flex items-center gap-6">
        {/* Scaled Legend */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Occupancy</span>
          <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-800/40 rounded-lg border border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-sm bg-[#1e293b] border border-slate-600"></div>
              <span className="text-xs font-bold text-slate-300">0</span>
            </div>
            <div className="w-6 h-[1px] bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-sm bg-indigo-700/80"></div>
              <span className="text-xs font-bold text-slate-300">5</span>
            </div>
            <div className="w-6 h-[1px] bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-sm bg-fuchsia-600"></div>
              <span className="text-xs font-bold text-slate-300">10</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-l border-slate-800 pl-6">
          <button
            onClick={onPrev}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
            aria-label="Previous Month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={onNext}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
            aria-label="Next Month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
