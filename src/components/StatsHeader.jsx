import { useState, useEffect, useRef } from 'react';

const StatsHeader = ({ stats, trend, currentFilter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'all', label: 'All Bookings' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'checked_in', label: 'Checked In' },
    { value: 'checked_out', label: 'Checked Out' },
  ];

  const currentLabel = options.find(opt => opt.value === currentFilter)?.label || 'All Bookings';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
          Monthly Performance
        </h2>
        
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">View Mode:</span>
          
          <div className="relative" ref={dropdownRef}>
            {/* Dropdown Trigger */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between w-48 bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-bold rounded-lg px-4 py-2 hover:border-slate-600 hover:bg-slate-900 transition-all shadow-lg text-left"
            >
              <span>{currentLabel}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Options List */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0f172a] border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-100">
                <div className="py-1">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onFilterChange(option.value);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-slate-800/50 transition-colors ${
                        currentFilter === option.value ? 'bg-indigo-500/5' : ''
                      }`}
                    >
                      <span className={`text-xs font-bold ${currentFilter === option.value ? 'text-indigo-400' : 'text-slate-300'}`}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Average Occupancy */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg Occupancy</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">{stats.averageOccupancy}%</h3>
          </div>
          {trend && (
            <div className={`flex items-center px-2 py-1 rounded text-[10px] font-bold ${trend.isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </div>
          )}
        </div>
        <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
            style={{ width: `${stats.averageOccupancy}%` }}
          />
        </div>
      </div>

      {/* Total Revenue */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Est. Revenue</p>
        <h3 className="text-3xl font-extrabold text-white mt-1">
          ₹{stats.totalRevenue.toLocaleString('en-IN')}
        </h3>
        <p className="text-[10px] text-slate-500 mt-2 font-medium">Based on month check-ins</p>
      </div>

      {/* Room Nights */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Room-Nights Sold</p>
        <h3 className="text-3xl font-extrabold text-white mt-1">{stats.totalOccupiedRoomNights}</h3>
        <p className="text-[10px] text-slate-500 mt-2 font-medium">Total volume for the month</p>
      </div>
    </div>
    </div>
  );
};

export default StatsHeader;
