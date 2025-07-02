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

import com.myApp.bookMyShow.dto.TheaterCreateDto;
import com.myApp.bookMyShow.dto.TheaterResponseDto;
import com.myApp.bookMyShow.service.TheaterService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/theaters")
public class TheaterController {
	@Autowired
	private TheaterService theaterService;

	// Get all theaters
	@GetMapping
	public ResponseEntity<List<TheaterResponseDto>> getAllTheaters() {
		List<TheaterResponseDto> theaters = theaterService.getAllTheaters();
		return ResponseEntity.ok(theaters);
	}

	// Add a new theater
	@PostMapping
	public ResponseEntity<TheaterResponseDto> addTheater(@Valid @RequestBody TheaterCreateDto theaterDto) {
		TheaterResponseDto theater = theaterService.addTheater(theaterDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(theater);
	}

	// Get a specific theater by ID
	@GetMapping("/{id}")
	public ResponseEntity<TheaterResponseDto> getTheaterById(@PathVariable Long id) {
		TheaterResponseDto theater = theaterService.getTheaterById(id);
		return ResponseEntity.ok(theater);
	}
}
