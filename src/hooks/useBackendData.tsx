
import { useState, useCallback } from 'react';

// Types for future backend integration
export interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  price: number;
  lat: number;
  lng: number;
  available: boolean;
  type: 'covered' | 'uncovered';
  evCharging: boolean;
  ownerId: string;
}

export interface BookingData {
  spotId: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
}

export const useBackendData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with real API calls when backend is ready
  const fetchParkingSpots = useCallback(async (lat: number, lng: number, radius: number = 1000) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Placeholder for real API call
      console.log(`Fetching parking spots near ${lat}, ${lng} within ${radius}m`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return empty array until backend is integrated
      return [];
    } catch (err) {
      setError('Failed to fetch parking spots');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBooking = useCallback(async (bookingData: BookingData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Placeholder for real API call
      console.log('Creating booking:', bookingData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true, bookingId: 'mock-booking-id' };
    } catch (err) {
      setError('Failed to create booking');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchUserBookings = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Placeholder for real API call
      console.log('Fetching bookings for user:', userId);
      
      // Return empty array until backend is integrated
      return [];
    } catch (err) {
      setError('Failed to fetch bookings');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createParkingSpot = useCallback(async (spotData: Omit<ParkingSpot, 'id'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Placeholder for real API call
      console.log('Creating parking spot:', spotData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true, spotId: 'mock-spot-id' };
    } catch (err) {
      setError('Failed to create parking spot');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    fetchParkingSpots,
    createBooking,
    fetchUserBookings,
    createParkingSpot
  };
};
