import React, { useState, useEffect } from 'react';
import MovieService from '../services/movieService';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.length > 2) {
        setIsLoading(true);
        MovieService.searchMovies(query)
          .then(results => {
            setSuggestions(results.slice(0, 5)); // Show max 5 suggestions
            setShowSuggestions(true);
            setIsLoading(false);
          })
          .catch(() => {
            setSuggestions([]);
            setIsLoading(false);
          });
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (movie) => {
    setQuery(movie.title);
    onSearch(movie.title);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={() => query.length > 2 && setShowSuggestions(true)}
            placeholder="Search for movies, events, sports..."
            className="w-full px-4 py-2 pr-10 text-gray-700 bg-gray-100 border border-gray-300 rounded-l-lg focus:outline-none focus:border-primary focus:bg-white transition duration-200"
          />
          
          {/* Search Icon */}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            ) : (
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleSuggestionClick(movie)}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded mr-3"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{movie.title}</h4>
                    <p className="text-sm text-gray-500">{movie.genre}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-r-lg hover:bg-red-600 focus:outline-none transition duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;