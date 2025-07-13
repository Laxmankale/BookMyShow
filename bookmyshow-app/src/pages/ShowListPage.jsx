import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieService from '../services/movieService';

const ShowListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    loadMovieAndShows();
  }, [id]);

  const loadMovieAndShows = async () => {
    try {
      setLoading(true);
      const [movieData, showsData] = await Promise.all([
        MovieService.getMovieById(id),
        MovieService.getShowsForMovie(id)
      ]);
      
      setMovie(movieData);
      setShows(showsData);
      
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowSelect = (showId) => {
    navigate(`/booking/${showId}`);
  };

  const getDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    
    return dates;
  };

  const filteredShows = shows.filter(show => show.date === selectedDate);

  const groupShowsByCinema = (shows) => {
    return shows.reduce((acc, show) => {
      if (!acc[show.cinema]) {
        acc[show.cinema] = [];
      }
      acc[show.cinema].push(show);
      return acc;
    }, {});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shows...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Movie Not Found</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const groupedShows = groupShowsByCinema(filteredShows);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Movie Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-6">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-20 h-28 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
              }}
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{movie.title}</h1>
              <div className="flex items-center space-x-4 mt-2 text-gray-600">
                <span>{movie.genre}</span>
                <span>•</span>
                <span>{movie.duration}</span>
                <span>•</span>
                <span>{movie.language}</span>
                <span>•</span>
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  {movie.rating}/10
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h2>
          <div className="flex space-x-2 overflow-x-auto">
            {getDateOptions().map(date => (
              <button
                key={date.value}
                onClick={() => setSelectedDate(date.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition duration-200 ${
                  selectedDate === date.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {date.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shows List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Object.keys(groupedShows).length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Shows Available</h3>
            <p className="text-gray-600 mb-4">
              There are no shows available for the selected date. Please try another date.
            </p>
            <button
              onClick={() => navigate(`/movie/${id}`)}
              className="btn-primary"
            >
              Back to Movie Details
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedShows).map(([cinema, cinemaShows]) => (
              <div key={cinema} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{cinema}</h3>
                    <p className="text-gray-600 text-sm">
                      {cinemaShows.length} show{cinemaShows.length !== 1 ? 's' : ''} available
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Starting from</p>
                    <p className="text-lg font-bold text-primary">
                      ₹{Math.min(...cinemaShows.map(show => show.price))}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {cinemaShows.map(show => (
                    <button
                      key={show.id}
                      onClick={() => handleShowSelect(show.id)}
                      className="group border-2 border-gray-200 rounded-lg p-4 hover:border-primary hover:bg-primary hover:text-white transition duration-200"
                    >
                      <div className="text-center">
                        <div className="font-bold text-lg group-hover:text-white">
                          {show.time}
                        </div>
                        <div className="text-sm text-gray-600 group-hover:text-white opacity-75">
                          ₹{show.price}
                        </div>
                        <div className="text-xs text-gray-500 group-hover:text-white opacity-75 mt-1">
                          {show.availableSeats} seats
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Cinema Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        City Center Mall
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        Cancellation Available
                      </span>
                    </div>
                    <span className="text-primary font-medium">M-Ticket</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(`/movie/${id}`)}
            className="btn-secondary"
          >
            ← Back to Movie Details
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Selection</h3>
              <p className="text-gray-600 text-sm">Choose your preferred show time and cinema</p>
            </div>
            <div>
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Booking</h3>
              <p className="text-gray-600 text-sm">Your booking is protected with secure payment</p>
            </div>
            <div>
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Confirmation</h3>
              <p className="text-gray-600 text-sm">Get your tickets confirmed immediately</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowListPage;