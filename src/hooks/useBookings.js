import { useState, useEffect } from 'react';

/**
 * Custom hook to handle fetching and state management for hotel bookings.
 */
export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        // Fetch from public folder
        const response = await fetch('/bookings.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.statusText}`);
        }

        const data = await response.json();
        setBookings(data);
        setError(null);
      } catch (err) {
        console.error("Error loading bookings:", err);
        setError(err.message || "An unexpected error occurred while loading bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, loading, error };
}
