import { getDailyOccupancy } from './occupancyUtils.js';

export function calculateMonthlyStats(bookings, year, month) {
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();
  
  let totalOccupiedRoomNights = 0;
  let totalRevenue = 0;
  
  // Calculate revenue: Sum totalAmount of all non-cancelled bookings checking in this month.
  const checkInsThisMonth = bookings.filter(b => {
      if (b.status === 'cancelled') return false;
      const d = new Date(b.checkIn);
      return d.getFullYear() === year && d.getMonth() === month;
  });
  
  checkInsThisMonth.forEach(b => {
      totalRevenue += (b.totalAmount || 0);
  });

  // Calculate average occupancy
  for (let i = 1; i <= numDaysInMonth; i++) {
    const d = new Date(year, month, i);
    totalOccupiedRoomNights += getDailyOccupancy(bookings, d);
  }

  // There are 10 rooms total in the hotel
  const totalAvailableRoomNights = numDaysInMonth * 10;
  const averageOccupancy = (totalOccupiedRoomNights / totalAvailableRoomNights) * 100;

  return {
    averageOccupancy: Math.round(averageOccupancy),
    totalRevenue,
    totalOccupiedRoomNights
  };
}

export function getTrendIndicator(currentStats, prevStats) {
  if (!prevStats || isNaN(prevStats.averageOccupancy)) return null;
  const diff = currentStats.averageOccupancy - prevStats.averageOccupancy;
  return {
    value: Math.abs(diff),
    isPositive: diff >= 0
  };
}
