package com.myApp.bookMyShow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myApp.bookMyShow.entity.Booking;
import com.myApp.bookMyShow.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

	 @Autowired
	    private BookingService bookingService;

	    // Get all bookings
	    @GetMapping
	    public List<Booking> getAllBookings() {
	        return bookingService.getAllBookings();
	    }

	    // Create a new booking
	    @PostMapping
	    public Booking createBooking(@RequestBody Booking booking) {
	        return bookingService.createBooking(booking);
	    }

	    // Get booking by ID
	    @GetMapping("/{id}")
	    public Booking getBookingById(@PathVariable Long id) {
	        return bookingService.getBookingById(id);
	    }
}
