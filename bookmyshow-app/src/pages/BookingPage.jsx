import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';
import MovieService from '../services/movieService';
import BookingService from '../services/bookingService';

const BookingPage = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    loadShowDetails();
  }, [showId]);

  const loadShowDetails = async () => {
    try {
      setLoading(true);
      const showData = await MovieService.getShowById(showId);
      setShow(showData);
    } catch (error) {
      console.error('Error loading show details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatSelectionChange = (seats) => {
    setSelectedSeats(seats);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBooking = async () => {
    // Validate seat selection
    const validation = BookingService.validateSeatSelection(selectedSeats);
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    // Validate customer info
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('Please fill in all customer details');
      return;
    }

    try {
      setBookingInProgress(true);
      
      const bookingData = {
        showId: showId,
        movieTitle: show.movie.title,
        cinema: show.cinema,
        date: show.date,
        time: show.time,
        selectedSeats: selectedSeats,
        customerInfo: customerInfo,
        totalAmount: BookingService.calculateTotal(selectedSeats)
      };

      const booking = await BookingService.bookTickets(bookingData);
      
      // Redirect to success page
      navigate('/booking-success', { 
        state: { 
          bookingId: booking.id,
          booking: booking 
        } 
      });
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book tickets. Please try again.');
    } finally {
      setBookingInProgress(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Show Not Found</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = BookingService.calculateTotal(selectedSeats);
  const convenienceFee = Math.floor(totalAmount * 0.02); // 2% convenience fee
  const finalTotal = totalAmount + convenienceFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={show.movie.poster}
                alt={show.movie.title}
                className="w-16 h-20 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
                }}
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{show.movie.title}</h1>
                <div className="text-gray-600">
                  <span>{show.cinema}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(show.date)}</span>
                  <span className="mx-2">•</span>
                  <span>{show.time}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <SeatSelection 
              showId={showId} 
              onSeatSelectionChange={handleSeatSelectionChange}
            />
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>

              {/* Movie Details */}
              <div className="mb-6 pb-6 border-b">
                <h4 className="font-semibold text-gray-900 mb-2">{show.movie.title}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{show.cinema}</p>
                  <p>{formatDate(show.date)} | {show.time}</p>
                  <p>{show.movie.language} | {show.movie.duration}</p>
                </div>
              </div>

              {/* Selected Seats */}
              {selectedSeats.length > 0 && (
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-semibold text-gray-900 mb-3">Selected Seats</h4>
                  <div className="space-y-2">
                    {selectedSeats.map(seat => (
                      <div key={seat.id} className="flex justify-between text-sm">
                        <span>{seat.id}</span>
                        <span>₹{seat.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Information */}
              <div className="mb-6 pb-6 border-b">
                <h4 className="font-semibold text-gray-900 mb-3">Customer Details</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              {selectedSeats.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Tickets ({selectedSeats.length})</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Convenience Fee</span>
                      <span>₹{convenienceFee}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-primary">₹{finalTotal}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={selectedSeats.length === 0 || bookingInProgress}
                className={`w-full py-3 rounded-lg font-bold text-lg transition duration-300 ${
                  selectedSeats.length === 0 || bookingInProgress
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {bookingInProgress ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </span>
                ) : selectedSeats.length === 0 ? (
                  'Select Seats to Continue'
                ) : (
                  `Pay ₹${finalTotal}`
                )}
              </button>

              {/* Terms */}
              <p className="text-xs text-gray-500 mt-4 text-center">
                By proceeding, you agree to our Terms & Conditions and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-primary text-2xl mb-2">🎟️</div>
              <h4 className="font-semibold text-gray-900 mb-1">M-Ticket</h4>
              <p className="text-sm text-gray-600">Mobile tickets accepted</p>
            </div>
            <div>
              <div className="text-primary text-2xl mb-2">🔄</div>
              <h4 className="font-semibold text-gray-900 mb-1">Easy Cancellation</h4>
              <p className="text-sm text-gray-600">Cancel up to 2 hours before</p>
            </div>
            <div>
              <div className="text-primary text-2xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-1">Secure Payment</h4>
              <p className="text-sm text-gray-600">Your data is protected</p>
            </div>
            <div>
              <div className="text-primary text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-1">Instant Confirmation</h4>
              <p className="text-sm text-gray-600">Get tickets immediately</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;