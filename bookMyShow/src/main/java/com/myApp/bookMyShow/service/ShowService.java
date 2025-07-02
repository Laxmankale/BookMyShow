package com.myApp.bookMyShow.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myApp.bookMyShow.dto.ShowCreateDto;
import com.myApp.bookMyShow.dto.ShowResponseDto;
import com.myApp.bookMyShow.entity.Movie;
import com.myApp.bookMyShow.entity.Show;
import com.myApp.bookMyShow.entity.Theater;
import com.myApp.bookMyShow.repository.MovieRepository;
import com.myApp.bookMyShow.repository.ShowRepository;
import com.myApp.bookMyShow.repository.TheaterRepository;

@Service
public class ShowService {

	@Autowired
	private ShowRepository showRepository;
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private TheaterRepository theaterRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	// Get all shows
	public List<ShowResponseDto> getAllShows() {
		List<Show> shows = showRepository.findAll();
		return shows.stream()
				.map(show -> modelMapper.map(show, ShowResponseDto.class))
				.collect(Collectors.toList());
	}

	// Add a new show
	public ShowResponseDto addShow(ShowCreateDto showDto) {
		// Validate movie exists
		Optional<Movie> movieOptional = movieRepository.findById(showDto.getMovieId());
		if (!movieOptional.isPresent()) {
			throw new IllegalArgumentException("Movie not found with id: " + showDto.getMovieId());
		}
		
		// Validate theater exists
		Optional<Theater> theaterOptional = theaterRepository.findById(showDto.getTheaterId());
		if (!theaterOptional.isPresent()) {
			throw new IllegalArgumentException("Theater not found with id: " + showDto.getTheaterId());
		}
		
		Show show = new Show();
		show.setShowTime(showDto.getShowTime());
		show.setMovie(movieOptional.get());
		show.setTheater(theaterOptional.get());
		
		Show savedShow = showRepository.save(show);
		return modelMapper.map(savedShow, ShowResponseDto.class);
	}

	// Get a specific show by ID
	public ShowResponseDto getShowById(Long id) {
		Optional<Show> showOptional = showRepository.findById(id);
		if (showOptional.isPresent()) {
			return modelMapper.map(showOptional.get(), ShowResponseDto.class);
		}
		throw new IllegalArgumentException("Show not found with id: " + id);
	}
}
