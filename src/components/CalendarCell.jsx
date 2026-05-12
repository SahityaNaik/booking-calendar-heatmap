/**
 * CalendarCell Component
 * Represents a single day in the calendar grid with heatmap coloring.
 */
const CalendarCell = ({ 
  day, 
  occupancy, 
  isToday, 
  isSelected, 
  isSelectionStart,
  isSelectionEnd,
  onMouseDown, 
  onMouseEnter 
}) => {
  const { date, isCurrentMonth } = day;
  
  // Heatmap color logic (Scale: 0-10 rooms)
  const getHeatmapClass = (count) => {
    if (count === 0) return 'bg-[#1e293b]'; // Slate 800
    if (count <= 2) return 'bg-indigo-900/30'; 
    if (count <= 4) return 'bg-indigo-900/60';
    if (count <= 6) return 'bg-indigo-700/80';
    if (count <= 8) return 'bg-indigo-600';
    if (count < 10) return 'bg-indigo-500';
    return 'bg-fuchsia-600 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]';
  };

  const heatmapClass = isCurrentMonth ? getHeatmapClass(occupancy) : 'bg-slate-800/80';
  
  // High contrast text for darker/vibrant backgrounds
  const isHighOccupancy = occupancy >= 7;
  const textClass = isCurrentMonth 
    ? (isHighOccupancy ? 'text-white' : 'text-slate-100') 
    : 'text-slate-500';
  
  const subTextClass = isCurrentMonth
    ? (isHighOccupancy ? 'text-indigo-100' : 'text-slate-400')
    : 'text-slate-600';

  return (
    <div
      onMouseDown={() => onMouseDown(date)}
      onMouseEnter={() => onMouseEnter(date)}
      className={`
        relative h-20 border-r border-b border-slate-700/50 p-2 transition-all cursor-pointer select-none
        ${heatmapClass}
        ${isSelected ? 'ring-2 ring-indigo-400 ring-inset z-10' : ''}
        ${isSelectionStart ? 'rounded-l-sm' : ''}
        ${isSelectionEnd ? 'rounded-r-sm' : ''}
      `}
    >
      <div className="flex justify-between items-start">
        <span className={`text-xs font-bold ${textClass}`}>
          {date.getDate()}
        </span>
        
        {isToday && (
          <span className="w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]" title="Today" />
        )}
      </div>

      {isCurrentMonth && (
        <div className="mt-2 text-[10px] font-semibold">
          <span className={subTextClass}>
            {occupancy} / 10 <span className="opacity-60 font-normal">rooms</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default CalendarCell;
