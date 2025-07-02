package com.myApp.bookMyShow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myApp.bookMyShow.dto.MovieCreateDto;
import com.myApp.bookMyShow.dto.MovieResponseDto;
import com.myApp.bookMyShow.service.MovieService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

	@Autowired
	private MovieService movieService;

	// Add a new movie
	@PostMapping
	public ResponseEntity<MovieResponseDto> addMovie(@Valid @RequestBody MovieCreateDto movieDto) {
		MovieResponseDto movie = movieService.addMovie(movieDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(movie);
	}

	// Get movie by ID
	@GetMapping("/{id}")
	public ResponseEntity<MovieResponseDto> getMovieById(@PathVariable("id") Long id) {
		MovieResponseDto movie = movieService.getMovieById(id);
		return ResponseEntity.ok(movie);
	}

	// Get all movies
	@GetMapping
	public ResponseEntity<List<MovieResponseDto>> getAllMovies() {
		List<MovieResponseDto> movies = movieService.getAllMovies();
		return ResponseEntity.ok(movies);
	}
}
