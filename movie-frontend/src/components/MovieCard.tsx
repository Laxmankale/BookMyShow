import React from 'react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const handleViewDetails = () => {
    // For now, just log the movie details
    console.log('View details for:', movie.name);
    // In a real app, this would navigate to a detailed view
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full h-64 object-cover"
          onError={(e) => {
            // Fallback for broken images
            e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        {movie.rating && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold">
            ⭐ {movie.rating}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {movie.name}
        </h3>
        
        {movie.genre && (
          <p className="text-gray-600 text-sm mb-2">
            {movie.genre}
          </p>
        )}
        
        {movie.description && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {movie.description}
          </p>
        )}
        
        <div className="flex justify-between items-center">
          {movie.duration && (
            <span className="text-gray-500 text-sm">
              {movie.duration} min
            </span>
          )}
          
          <button
            onClick={handleViewDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;