export function getDaysInMonthGrid(year, month) {
  // month is 0-indexed in JS Dates (0 = Jan, 11 = Dec)
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const days = [];
  
  // Get day of week for the 1st of the month (0 = Sun, 6 = Sat)
  const startDayOfWeek = firstDayOfMonth.getDay();
  
  // 1. Pad with previous month days
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({
      date: d,
      isCurrentMonth: false,
    });
  }

  // 2. Add current month days
  const numDaysInMonth = lastDayOfMonth.getDate();
  for (let i = 1; i <= numDaysInMonth; i++) {
    const d = new Date(year, month, i);
    days.push({
      date: d,
      isCurrentMonth: true,
    });
  }

  // 3. Pad with next month days (fill up to a 42-cell grid for 6 rows)
  const totalCells = 42; 
  const remainingCells = totalCells - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    const d = new Date(year, month + 1, i);
    days.push({
      date: d,
      isCurrentMonth: false,
    });
  }

  return days;
}
