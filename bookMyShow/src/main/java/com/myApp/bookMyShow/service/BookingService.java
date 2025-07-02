package com.myApp.bookMyShow.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myApp.bookMyShow.dto.BookingCreateDto;
import com.myApp.bookMyShow.dto.BookingResponseDto;
import com.myApp.bookMyShow.entity.Booking;
import com.myApp.bookMyShow.entity.Show;
import com.myApp.bookMyShow.entity.User;
import com.myApp.bookMyShow.repository.BookingRepository;
import com.myApp.bookMyShow.repository.ShowRepository;
import com.myApp.bookMyShow.repository.UserRepository;

@Service
public class BookingService {
	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ShowRepository showRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	// Get all bookings
	public List<BookingResponseDto> getAllBookings() {
		List<Booking> bookings = bookingRepository.findAll();
		return bookings.stream()
				.map(booking -> modelMapper.map(booking, BookingResponseDto.class))
				.collect(Collectors.toList());
	}

	// Create a new booking
	public BookingResponseDto createBooking(BookingCreateDto bookingDto) {
		// Validate user exists
		Optional<User> userOptional = userRepository.findById(bookingDto.getUserId());
		if (!userOptional.isPresent()) {
			throw new IllegalArgumentException("User not found with id: " + bookingDto.getUserId());
		}
		
		// Validate show exists
		Optional<Show> showOptional = showRepository.findById(bookingDto.getShowId());
		if (!showOptional.isPresent()) {
			throw new IllegalArgumentException("Show not found with id: " + bookingDto.getShowId());
		}
		
		Booking booking = new Booking();
		booking.setNumberOfSeats(bookingDto.getNumberOfSeats());
		booking.setBookingTime(LocalDateTime.now());
		booking.setUser(userOptional.get());
		booking.setShow(showOptional.get());
		
		Booking savedBooking = bookingRepository.save(booking);
		return modelMapper.map(savedBooking, BookingResponseDto.class);
	}

	// Get a specific booking by ID
	public BookingResponseDto getBookingById(Long id) {
		Optional<Booking> bookingOptional = bookingRepository.findById(id);
		if (bookingOptional.isPresent()) {
			return modelMapper.map(bookingOptional.get(), BookingResponseDto.class);
		}
		throw new IllegalArgumentException("Booking not found with id: " + id);
	}
}
