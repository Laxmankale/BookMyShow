import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">BookMyShow</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition duration-200">
              Movies
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-primary font-medium transition duration-200">
              Events
            </Link>
            <Link to="/sports" className="text-gray-700 hover:text-primary font-medium transition duration-200">
              Sports
            </Link>
            <button className="btn-primary">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              {/* Search Bar - Mobile */}
              <div className="mb-4">
                <SearchBar onSearch={handleSearch} />
              </div>
              
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <Link
                to="/events"
                className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/sports"
                className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sports
              </Link>
              <button className="w-full text-left px-3 py-2 btn-primary">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;