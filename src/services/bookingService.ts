
// In a real application, this would connect to your backend API
// For now, we'll simulate storage using localStorage

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  reason: string;
  communicationPreference: "chat" | "call" | "video";
  appointmentTime: Date;
}

export const saveBooking = async (bookingData: BookingData): Promise<{ success: boolean; id?: string }> => {
  try {
    // In a real application, this would be an API call
    const bookingId = `booking_${Date.now()}`;
    const bookingsData = getStoredBookings();
    
    bookingsData[bookingId] = {
      ...bookingData,
      appointmentTime: bookingData.appointmentTime.toISOString(), // Convert date to string for storage
      status: "confirmed",
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem("genz_bookings", JSON.stringify(bookingsData));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      id: bookingId
    };
  } catch (error) {
    console.error("Error saving booking:", error);
    return {
      success: false
    };
  }
};

export const getStoredBookings = (): Record<string, any> => {
  try {
    const storedData = localStorage.getItem("genz_bookings");
    return storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    return {};
  }
};

export const getBookingById = (id: string): BookingData | null => {
  const bookings = getStoredBookings();
  const booking = bookings[id];
  
  if (!booking) return null;
  
  // Convert stored date string back to Date object
  return {
    ...booking,
    appointmentTime: new Date(booking.appointmentTime)
  };
};

export const isTimeSlotAvailable = (timeSlot: Date): boolean => {
  // In a real application, this would check against your database
  // For now, we'll simulate by checking localStorage
  const bookings = getStoredBookings();
  
  // Convert the timeSlot to a string for comparisons
  const timeSlotStr = timeSlot.toISOString();
  
  // Check if any booking has this exact time
  return !Object.values(bookings).some(
    (booking: any) => {
      const bookingTime = new Date(booking.appointmentTime).toISOString();
      return bookingTime === timeSlotStr;
    }
  );
};
