package com.myApp.bookMyShow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myApp.bookMyShow.entity.Movie;
import com.myApp.bookMyShow.repository.MovieRepository;

@Service
public class MovieService {
	@Autowired
	private MovieRepository movieRepository;

	// Get all movies
	public List<Movie> getAllMovies() {
		return movieRepository.findAll();
	}

	// Add a new movie
	public Movie addMovie(Movie movie) {
		return movieRepository.save(movie);
	}

	// Get a specific movie by ID
	public Movie getMovieById(Long id) {
		Optional<Movie> movie = movieRepository.findById(id);
		return movie.orElse(null);
	}
}
