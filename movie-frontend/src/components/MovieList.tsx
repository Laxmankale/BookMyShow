import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/Movie';
import { movieService } from '../services/movieService';
import { demoMovies } from '../data/demoMovies';

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState<boolean>(false);

  useEffect(() => {
    if (demoMode) {
      setMovies(demoMovies);
      setLoading(false);
      setError(null);
    } else {
      fetchMovies();
    }
  }, [demoMode]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await movieService.getMovies();
      setMovies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching movies');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDemoMode = () => {
    setDemoMode(!demoMode);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !demoMode) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
        <div className="space-x-4">
          <button
            onClick={fetchMovies}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Retry
          </button>
          <button
            onClick={toggleDemoMode}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            View Demo Data
          </button>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-xl">No movies found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Movies {demoMode && <span className="text-sm text-green-600">(Demo Mode)</span>}
        </h1>
        
        <button
          onClick={toggleDemoMode}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            demoMode 
              ? 'bg-gray-600 hover:bg-gray-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {demoMode ? 'Switch to API' : 'View Demo'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;