import React, { useState, useEffect } from 'react';
import BookingService from '../services/bookingService';

const SeatSelection = ({ showId, onSeatSelectionChange }) => {
  const [seatLayout, setSeatLayout] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSeatLayout();
  }, [showId]);

  const loadSeatLayout = async () => {
    try {
      setLoading(true);
      const layout = await BookingService.getSeatLayout(showId);
      setSeatLayout(layout);
    } catch (error) {
      console.error('Error loading seat layout:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (seat) => {
    if (seat.status === 'occupied') return;

    let newSelectedSeats;
    const isSelected = selectedSeats.find(s => s.id === seat.id);

    if (isSelected) {
      // Deselect seat
      newSelectedSeats = selectedSeats.filter(s => s.id !== seat.id);
    } else {
      // Select seat (max 10 seats)
      if (selectedSeats.length >= 10) {
        alert('Maximum 10 seats can be selected');
        return;
      }
      newSelectedSeats = [...selectedSeats, seat];
    }

    setSelectedSeats(newSelectedSeats);
    onSeatSelectionChange(newSelectedSeats);
  };

  const getSeatClass = (seat) => {
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    const baseClass = 'seat text-xs font-bold flex items-center justify-center';

    if (seat.status === 'occupied') {
      return `${baseClass} seat-occupied`;
    } else if (isSelected) {
      return `${baseClass} seat-selected`;
    } else {
      return `${baseClass} seat-available`;
    }
  };

  const getPriceCategory = (row) => {
    if (row <= 'C') return { name: 'Premium', color: 'text-purple-600' };
    if (row <= 'F') return { name: 'Executive', color: 'text-blue-600' };
    return { name: 'Standard', color: 'text-green-600' };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-xl font-bold mb-6 text-center">Select Your Seats</h3>

      {/* Screen */}
      <div className="mb-8">
        <div className="w-full h-2 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-full mb-2"></div>
        <p className="text-center text-sm text-gray-600">SCREEN</p>
      </div>

      {/* Seat Layout */}
      <div className="mb-6">
        {seatLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center mb-2">
            {/* Row Label */}
            <div className="flex items-center mr-4">
              <span className={`font-bold text-sm ${getPriceCategory(row[0].row).color}`}>
                {row[0].row}
              </span>
            </div>

            {/* Seats */}
            <div className="flex space-x-1">
              {row.map((seat, seatIndex) => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  className={getSeatClass(seat)}
                  disabled={seat.status === 'occupied'}
                  title={`${seat.id} - ₹${seat.price}`}
                >
                  {seat.number}
                </button>
              ))}
            </div>

            {/* Row Label (Right) */}
            <div className="flex items-center ml-4">
              <span className={`font-bold text-sm ${getPriceCategory(row[0].row).color}`}>
                {row[0].row}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 text-sm mb-6">
        <div className="flex items-center">
          <div className="seat seat-available mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="seat seat-selected mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="seat seat-occupied mr-2"></div>
          <span>Occupied</span>
        </div>
      </div>

      {/* Price Categories */}
      <div className="border-t pt-4">
        <h4 className="font-semibold mb-3">Price Categories</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-purple-600 font-bold">Premium (A-C)</div>
            <div>₹320</div>
          </div>
          <div className="text-center">
            <div className="text-blue-600 font-bold">Executive (D-F)</div>
            <div>₹280</div>
          </div>
          <div className="text-center">
            <div className="text-green-600 font-bold">Standard (G-J)</div>
            <div>₹250</div>
          </div>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Selected Seats</h4>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map(seat => (
              <span
                key={seat.id}
                className="bg-primary text-white px-2 py-1 rounded text-sm"
              >
                {seat.id} (₹{seat.price})
              </span>
            ))}
          </div>
          <div className="mt-2 text-right">
            <span className="font-bold text-lg">
              Total: ₹{BookingService.calculateTotal(selectedSeats)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;