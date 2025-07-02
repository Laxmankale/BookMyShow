package com.myApp.bookMyShow.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myApp.bookMyShow.dto.TheaterCreateDto;
import com.myApp.bookMyShow.dto.TheaterResponseDto;
import com.myApp.bookMyShow.entity.Theater;
import com.myApp.bookMyShow.repository.TheaterRepository;

@Service
public class TheaterService {
	@Autowired
	private TheaterRepository theaterRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	// Get all theaters
	public List<TheaterResponseDto> getAllTheaters() {
		List<Theater> theaters = theaterRepository.findAll();
		return theaters.stream()
				.map(theater -> modelMapper.map(theater, TheaterResponseDto.class))
				.collect(Collectors.toList());
	}

	// Add a new theater
	public TheaterResponseDto addTheater(TheaterCreateDto theaterDto) {
		Theater theater = modelMapper.map(theaterDto, Theater.class);
		Theater savedTheater = theaterRepository.save(theater);
		return modelMapper.map(savedTheater, TheaterResponseDto.class);
	}

	// Get a specific theater by ID
	public TheaterResponseDto getTheaterById(Long id) {
		Optional<Theater> theaterOptional = theaterRepository.findById(id);
		if (theaterOptional.isPresent()) {
			return modelMapper.map(theaterOptional.get(), TheaterResponseDto.class);
		}
		throw new IllegalArgumentException("Theater not found with id: " + id);
	}
}
