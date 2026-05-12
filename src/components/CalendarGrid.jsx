import CalendarCell from './CalendarCell';
import { getDailyOccupancy } from '../utils/occupancyUtils';
import { isSameDay, isDateInRange } from '../utils/selectionUtils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid = ({ 
  days, 
  bookings, 
  selection, 
  onMouseDown, 
  onMouseEnter,
  onMouseUp
}) => {
  const today = new Date();

  return (
    <div 
      className="bg-slate-900 border-l border-t border-slate-700/50 shadow-2xl rounded-lg overflow-hidden"
      onMouseLeave={onMouseUp}
    >
      {/* Day Headers */}
      <div className="grid grid-cols-7 bg-slate-800/50 border-b border-slate-800">
        {WEEKDAYS.map(day => (
          <div key={day} className="py-2 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      {/* Grid Cells */}
      <div 
        className="grid grid-cols-7"
        onMouseUp={onMouseUp}
      >
        {days.map((day, index) => {
          const occupancy = getDailyOccupancy(bookings, day.date);
          const isSelected = isDateInRange(day.date, selection.selectionStart, selection.selectionEnd);
          
          return (
            <CalendarCell
              key={day.date.toISOString()}
              day={day}
              occupancy={occupancy}
              isToday={isSameDay(day.date, today)}
              isSelected={isSelected}
              isSelectionStart={isSameDay(day.date, selection.selectionStart)}
              isSelectionEnd={isSameDay(day.date, selection.selectionEnd)}
              onMouseDown={onMouseDown}
              onMouseEnter={onMouseEnter}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
