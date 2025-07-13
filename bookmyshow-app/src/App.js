import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import ShowListPage from './pages/ShowListPage';
import BookingPage from './pages/BookingPage';
import BookingSuccess from './pages/BookingSuccess';

function App() {
  return (
    <div className="App min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie/:id/shows" element={<ShowListPage />} />
        <Route path="/booking/:showId" element={<BookingPage />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
    </div>
  );
}

export default App;