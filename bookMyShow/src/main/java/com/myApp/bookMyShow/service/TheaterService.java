package com.myApp.bookMyShow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myApp.bookMyShow.entity.Theater;
import com.myApp.bookMyShow.repository.TheaterRepository;

@Service
public class TheaterService {
	@Autowired
	private TheaterRepository theaterRepository;

	// Get all theaters
	public List<Theater> getAllTheaters() {
		return theaterRepository.findAll();
	}

	// Add a new theater
	public Theater addTheater(Theater theater) {
		return theaterRepository.save(theater);
	}

	// Get a specific theater by ID
	public Theater getTheaterById(Long id) {
		Optional<Theater> theater = theaterRepository.findById(id);
		return theater.orElse(null);
	}
}
