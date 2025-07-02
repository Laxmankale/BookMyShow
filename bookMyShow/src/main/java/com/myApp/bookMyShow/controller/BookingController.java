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

import com.myApp.bookMyShow.dto.BookingCreateDto;
import com.myApp.bookMyShow.dto.BookingResponseDto;
import com.myApp.bookMyShow.service.BookingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

	@Autowired
	private BookingService bookingService;

	// Get all bookings
	@GetMapping
	public ResponseEntity<List<BookingResponseDto>> getAllBookings() {
		List<BookingResponseDto> bookings = bookingService.getAllBookings();
		return ResponseEntity.ok(bookings);
	}

	// Create a new booking
	@PostMapping
	public ResponseEntity<BookingResponseDto> createBooking(@Valid @RequestBody BookingCreateDto bookingDto) {
		BookingResponseDto booking = bookingService.createBooking(bookingDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(booking);
	}

	// Get booking by ID
	@GetMapping("/{id}")
	public ResponseEntity<BookingResponseDto> getBookingById(@PathVariable Long id) {
		BookingResponseDto booking = bookingService.getBookingById(id);
		return ResponseEntity.ok(booking);
	}
}
