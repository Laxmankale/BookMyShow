// Mock seat layout for demonstration
const generateSeatLayout = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 12;
  const seatLayout = [];

  rows.forEach(row => {
    const rowSeats = [];
    for (let i = 1; i <= seatsPerRow; i++) {
      const seatNumber = `${row}${i}`;
      const isOccupied = Math.random() < 0.3; // 30% chance of being occupied
      rowSeats.push({
        id: seatNumber,
        row: row,
        number: i,
        status: isOccupied ? 'occupied' : 'available',
        price: row <= 'C' ? 320 : row <= 'F' ? 280 : 250 // Premium, Executive, Standard
      });
    }
    seatLayout.push(rowSeats);
  });

  return seatLayout;
};

class BookingService {
  // Get seat layout for a show
  static getSeatLayout(showId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const seatLayout = generateSeatLayout();
        resolve(seatLayout);
      }, 500);
    });
  }

  // Book tickets
  static bookTickets(bookingData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate booking process
        if (bookingData.selectedSeats.length > 0) {
          const bookingId = 'BMS' + Date.now();
          const booking = {
            id: bookingId,
            ...bookingData,
            bookingTime: new Date().toISOString(),
            status: 'confirmed'
          };
          resolve(booking);
        } else {
          reject(new Error('No seats selected'));
        }
      }, 1000);
    });
  }

  // Get booking details
  static getBookingDetails(bookingId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock booking data
        if (bookingId) {
          const booking = {
            id: bookingId,
            movieTitle: "Spider-Man: No Way Home",
            cinema: "PVR Cinemas",
            date: "2024-01-15",
            time: "10:00 AM",
            seats: ["A1", "A2"],
            totalAmount: 500,
            bookingTime: new Date().toISOString(),
            status: 'confirmed'
          };
          resolve(booking);
        } else {
          reject(new Error('Booking not found'));
        }
      }, 300);
    });
  }

  // Cancel booking
  static cancelBooking(bookingId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (bookingId) {
          resolve({ message: 'Booking cancelled successfully' });
        } else {
          reject(new Error('Booking not found'));
        }
      }, 500);
    });
  }

  // Calculate total price
  static calculateTotal(selectedSeats) {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  }

  // Validate seat selection
  static validateSeatSelection(selectedSeats) {
    if (selectedSeats.length === 0) {
      return { valid: false, message: 'Please select at least one seat' };
    }
    if (selectedSeats.length > 10) {
      return { valid: false, message: 'Maximum 10 seats can be booked at once' };
    }
    return { valid: true };
  }
}

export default BookingService;