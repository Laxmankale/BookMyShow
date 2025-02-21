package com.myApp.bookMyShow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myApp.bookMyShow.entity.Movie;
import com.myApp.bookMyShow.repository.MovieRepository;
import com.myApp.bookMyShow.service.MovieService;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

	@Autowired
	private MovieService movieService;
	@Autowired
	private MovieRepository movieRepository;

	// Add a new movie
	@PostMapping
	public Movie addMovie(@RequestBody Movie movie) {
		return movieService.addMovie(movie);
	}

	// Get movie by ID
	@GetMapping("/{id}")
	public Movie getMovieById(@PathVariable("id") Long id) {
		return movieService.getMovieById(id);
	}

	@GetMapping
	public List<Movie> getAllMovies2() {
		List<Movie> movies = movieRepository.findAll();
		System.out.println("Movies fetched: " + movies); // Debugging log
		return movies;
	}
}
