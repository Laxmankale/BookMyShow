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

import com.myApp.bookMyShow.dto.ShowCreateDto;
import com.myApp.bookMyShow.dto.ShowResponseDto;
import com.myApp.bookMyShow.service.ShowService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/shows")
public class ShowController {
	@Autowired
	private ShowService showService;

	// Get all shows
	@GetMapping
	public ResponseEntity<List<ShowResponseDto>> getAllShows() {
		List<ShowResponseDto> shows = showService.getAllShows();
		return ResponseEntity.ok(shows);
	}

	// Add a new show
	@PostMapping
	public ResponseEntity<ShowResponseDto> addShow(@Valid @RequestBody ShowCreateDto showDto) {
		ShowResponseDto show = showService.addShow(showDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(show);
	}

	// Get a show by ID
	@GetMapping("/{id}")
	public ResponseEntity<ShowResponseDto> getShowById(@PathVariable Long id) {
		ShowResponseDto show = showService.getShowById(id);
		return ResponseEntity.ok(show);
	}
}
