import { normalizeDateRange } from './selectionUtils.js';

export function getDailyOccupancy(bookings, targetDate) {
  if (!bookings || bookings.length === 0) return 0;
  
  let occupiedCount = 0;
  
  // Truncate targetDate to midnight for accurate comparison
  const targetTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();

  for (const booking of bookings) {
    if (booking.status === 'cancelled') continue;

    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    
    const checkInTime = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate()).getTime();
    const checkOutTime = new Date(checkOutDate.getFullYear(), checkOutDate.getMonth(), checkOutDate.getDate()).getTime();

    // THE CORE RULE: targetDate must be >= checkIn and STRICTLY < checkOut
    // This enforces that the checkout day does NOT count towards occupancy
    if (targetTime >= checkInTime && targetTime < checkOutTime) {
      occupiedCount++;
    }
  }

  return Math.min(occupiedCount, 10); // Max 10 rooms in the hotel
}

export function getOverlappingBookings(bookings, selectionStart, selectionEnd) {
  if (!selectionStart) return [];
  
  // Normalize the user's drag selection
  const range = normalizeDateRange(selectionStart, selectionEnd);
  
  const rangeStartTime = range.start.getTime();
  const rangeEndTime = range.end.getTime();

  return bookings.filter(booking => {
    if (booking.status === 'cancelled') return false;

    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    
    const checkInTime = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate()).getTime();
    const checkOutTime = new Date(checkOutDate.getFullYear(), checkOutDate.getMonth(), checkOutDate.getDate()).getTime();

    // OVERLAP LOGIC:
    // A booking overlaps if it starts before the selection ends AND ends after the selection starts.
    return checkInTime <= rangeEndTime && checkOutTime > rangeStartTime;
  });
}
/**
 * Finds all bookings that overlap with a specific date range.
 */
export function getBookingsInRange(bookings, startDate, endDate) {
  if (!startDate || !endDate) return [];
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Normalize time to midnight for comparison
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return bookings.filter(booking => {
    if (booking.status === 'cancelled') return false;
    
    const bStart = new Date(booking.checkIn);
    const bEnd = new Date(booking.checkOut);
    bStart.setHours(0, 0, 0, 0);
    bEnd.setHours(0, 0, 0, 0);

    return bStart <= end && bEnd > start;
  });
}
