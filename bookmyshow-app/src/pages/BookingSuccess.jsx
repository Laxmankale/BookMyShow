import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (location.state?.booking) {
      setBooking(location.state.booking);
    } else {
      // If no booking data, redirect to home
      navigate('/');
    }
  }, [location.state, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2024-01-01 ${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const downloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert('Ticket download will start shortly. Check your email for the e-ticket.');
  };

  const shareBooking = () => {
    if (navigator.share && booking) {
      navigator.share({
        title: `${booking.movieTitle} - Movie Ticket`,
        text: `I just booked tickets for ${booking.movieTitle} at ${booking.cinema}!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I just booked tickets for ${booking?.movieTitle} at ${booking?.cinema}!`;
      navigator.clipboard.writeText(text).then(() => {
        alert('Booking details copied to clipboard!');
      });
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-xl opacity-90">
              Your tickets have been successfully booked
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-lg p-6 inline-block">
            <div className="text-sm opacity-75 mb-1">Booking ID</div>
            <div className="text-2xl font-bold tracking-wider">{booking.id}</div>
          </div>
        </div>
      </div>

      {/* Ticket Details */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Ticket Header */}
          <div className="bg-primary text-white px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{booking.movieTitle}</h2>
                <p className="opacity-90">{booking.cinema}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl">🎬</div>
              </div>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Show Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Show Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formatDate(booking.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{booking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cinema:</span>
                    <span className="font-medium">{booking.cinema}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Screen:</span>
                    <span className="font-medium">Screen 1</span>
                  </div>
                </div>
              </div>

              {/* Seat Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Seat Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Selected Seats:</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {booking.selectedSeats.map(seat => (
                        <span
                          key={seat.id}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {seat.id}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Seats:</span>
                    <span className="font-medium">{booking.selectedSeats.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Ticket Price ({booking.selectedSeats.length} tickets)</span>
                    <span>₹{booking.totalAmount - Math.floor(booking.totalAmount * 0.02)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Convenience Fee</span>
                    <span>₹{Math.floor(booking.totalAmount * 0.02)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total Amount Paid</span>
                    <span className="text-green-600">₹{booking.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium">{booking.customerInfo.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{booking.customerInfo.email}</p>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <p className="font-medium">{booking.customerInfo.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Footer with QR Code Area */}
          <div className="bg-gray-50 px-8 py-6 border-t border-dashed border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Show this QR code at the cinema</p>
                <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center">
                  <span className="text-xs text-gray-500">QR</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Booking Time</p>
                <p className="text-sm font-medium">
                  {new Date(booking.bookingTime).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={downloadTicket}
            className="btn-primary flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Ticket
          </button>
          
          <button
            onClick={shareBooking}
            className="btn-secondary flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share Booking
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Book More Tickets
          </button>
        </div>

        {/* Important Information */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 className="font-semibold text-yellow-800 mb-3">Important Information</h4>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>• Please arrive at the cinema at least 30 minutes before the show time</li>
            <li>• Carry a valid ID proof along with your e-ticket</li>
            <li>• Cancellation is allowed up to 2 hours before the show time</li>
            <li>• Outside food and beverages are not allowed inside the cinema</li>
            <li>• Mobile phones should be switched off or kept on silent mode during the show</li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team at{' '}
            <a href="tel:+911234567890" className="text-primary hover:underline">
              +91 12345 67890
            </a>{' '}
            or{' '}
            <a href="mailto:support@bookmyshow.com" className="text-primary hover:underline">
              support@bookmyshow.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;