export function normalizeDateRange(start, end) {
  if (!start) return { start: null, end: null };
  if (!end) return { start, end: start };

  // Strip time components to safely compare dates at midnight
  const d1 = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const d2 = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  if (d1.getTime() <= d2.getTime()) {
    return { start: d1, end: d2 };
  } else {
    // The user dragged backwards, so we flip them
    return { start: d2, end: d1 };
  }
}

export function isSameDay(date1, date2) {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isDateInRange(date, start, end) {
  if (!date || !start || !end) return false;
  
  const dTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  
  const range = normalizeDateRange(start, end);
  const sTime = range.start.getTime();
  const eTime = range.end.getTime();

  return dTime >= sTime && dTime <= eTime;
}
