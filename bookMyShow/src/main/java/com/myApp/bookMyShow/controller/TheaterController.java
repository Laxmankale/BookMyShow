package com.myApp.bookMyShow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myApp.bookMyShow.entity.Theater;
import com.myApp.bookMyShow.service.TheaterService;

@RestController
@RequestMapping("/api/theaters")
public class TheaterController {
	@Autowired
	private TheaterService theaterService;

	// Get all theaters
	@GetMapping
	public List<Theater> getAllTheaters() {
		return theaterService.getAllTheaters();
	}

	// Add a new theater
	@PostMapping
	public Theater addTheater(@RequestBody Theater theater) {
		return theaterService.addTheater(theater);
	}

	// Get a specific theater by ID
	@GetMapping("/{id}")
	public Theater getTheaterById(@PathVariable Long id) {
		return theaterService.getTheaterById(id);
	}
}
