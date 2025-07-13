import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieService from '../services/movieService';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovie();
  }, [id]);

  const loadMovie = async () => {
    try {
      setLoading(true);
      setError(null);
      const movieData = await MovieService.getMovieById(id);
      setMovie(movieData);
    } catch (err) {
      setError('Movie not found');
      console.error('Error loading movie:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    navigate(`/movie/${id}/shows`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Movie Not Found</h2>
          <p className="text-gray-600 mb-4">The movie you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Backdrop */}
      <div className="relative">
        <div 
          className="h-96 bg-cover bg-center bg-gray-900"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${movie.backdrop})` 
          }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
                {/* Movie Poster */}
                <div className="flex-shrink-0">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-64 h-96 object-cover rounded-lg shadow-2xl"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
                    }}
                  />
                </div>

                {/* Movie Info */}
                <div className="text-white text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                  
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4">
                    <div className={`flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1`}>
                      <span className="text-yellow-400 mr-1">⭐</span>
                      <span className="font-bold">{movie.rating}/10</span>
                    </div>
                    <span className="bg-white bg-opacity-20 rounded-full px-3 py-1">{movie.duration}</span>
                    <span className="bg-white bg-opacity-20 rounded-full px-3 py-1">{movie.language}</span>
                  </div>

                  <p className="text-lg opacity-90 mb-6 max-w-2xl">{movie.genre}</p>

                  <button onClick={handleBookNow} className="btn-primary text-lg px-8 py-3">
                    Book Tickets
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About the Movie */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Movie</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{movie.description}</p>
            </section>

            {/* Cast & Crew */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cast & Crew</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Director</h3>
                  <p className="text-gray-700">{movie.director}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Cast</h3>
                  <div className="space-y-1">
                    {movie.cast.map((actor, index) => (
                      <p key={index} className="text-gray-700">{actor}</p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Movie Info</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-900">Rating:</span>
                  <div className="flex items-center mt-1">
                    <span className={`text-2xl font-bold ${getRatingColor(movie.rating)}`}>
                      {movie.rating}/10
                    </span>
                    <span className="text-yellow-400 ml-2">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-gray-900">Duration:</span>
                  <p className="text-gray-700 mt-1">{movie.duration}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-900">Genre:</span>
                  <p className="text-gray-700 mt-1">{movie.genre}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-900">Language:</span>
                  <p className="text-gray-700 mt-1">{movie.language}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-900">Release Date:</span>
                  <p className="text-gray-700 mt-1">{formatDate(movie.releaseDate)}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-900">Price:</span>
                  <p className="text-primary font-bold text-xl mt-1">₹{movie.price} onwards</p>
                </div>
              </div>

              <button onClick={handleBookNow} className="w-full btn-primary mt-6 text-lg py-3">
                Book Now
              </button>

              <button 
                onClick={() => navigate('/')}
                className="w-full btn-secondary mt-3"
              >
                Back to Movies
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Watch {movie.title}?</h2>
          <p className="text-xl opacity-90 mb-8">
            Book your tickets now and enjoy the best cinematic experience
          </p>
          <button onClick={handleBookNow} className="bg-white text-primary px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition duration-300">
            Book Tickets Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;