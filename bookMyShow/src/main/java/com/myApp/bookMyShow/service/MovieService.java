package com.myApp.bookMyShow.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myApp.bookMyShow.dto.MovieCreateDto;
import com.myApp.bookMyShow.dto.MovieResponseDto;
import com.myApp.bookMyShow.entity.Movie;
import com.myApp.bookMyShow.repository.MovieRepository;

@Service
public class MovieService {
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	// Get all movies
	public List<MovieResponseDto> getAllMovies() {
		List<Movie> movies = movieRepository.findAll();
		return movies.stream()
				.map(movie -> modelMapper.map(movie, MovieResponseDto.class))
				.collect(Collectors.toList());
	}

	// Add a new movie
	public MovieResponseDto addMovie(MovieCreateDto movieDto) {
		Movie movie = modelMapper.map(movieDto, Movie.class);
		Movie savedMovie = movieRepository.save(movie);
		return modelMapper.map(savedMovie, MovieResponseDto.class);
	}

	// Get a specific movie by ID
	public MovieResponseDto getMovieById(Long id) {
		Optional<Movie> movieOptional = movieRepository.findById(id);
		if (movieOptional.isPresent()) {
			return modelMapper.map(movieOptional.get(), MovieResponseDto.class);
		}
		throw new IllegalArgumentException("Movie not found with id: " + id);
	}
}
