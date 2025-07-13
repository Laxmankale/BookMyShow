import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'bg-green-500';
    if (rating >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="card transform group-hover:scale-105 transition duration-300">
        {/* Movie Poster */}
        <div className="relative overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-72 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
            }}
          />
          
          {/* Rating Badge */}
          {movie.rating && (
            <div className={`absolute top-2 right-2 ${getRatingColor(movie.rating)} text-white px-2 py-1 rounded text-sm font-bold`}>
              ⭐ {formatRating(movie.rating)}
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 flex items-center justify-center">
            <button className="opacity-0 group-hover:opacity-100 bg-primary text-white px-6 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition duration-300">
              Book Now
            </button>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition duration-200">
            {movie.title}
          </h3>
          
          <div className="space-y-1 text-sm text-gray-600">
            <p className="flex items-center">
              <span className="font-medium">Genre:</span>
              <span className="ml-1">{movie.genre}</span>
            </p>
            
            <p className="flex items-center">
              <span className="font-medium">Duration:</span>
              <span className="ml-1">{movie.duration}</span>
            </p>
            
            <p className="flex items-center">
              <span className="font-medium">Language:</span>
              <span className="ml-1">{movie.language}</span>
            </p>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ₹{movie.price}
            </span>
            <span className="text-sm text-gray-500">
              onwards
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;