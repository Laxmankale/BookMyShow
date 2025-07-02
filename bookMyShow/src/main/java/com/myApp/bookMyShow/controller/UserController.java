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

import com.myApp.bookMyShow.dto.UserRegistrationDto;
import com.myApp.bookMyShow.dto.UserResponseDto;
import com.myApp.bookMyShow.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;

	// Get all users
	@GetMapping
	public ResponseEntity<List<UserResponseDto>> getAllUsers() {
		List<UserResponseDto> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}

	// Register a new user
	@PostMapping("/register")
	public ResponseEntity<UserResponseDto> registerUser(@Valid @RequestBody UserRegistrationDto userDto) {
		UserResponseDto user = userService.registerUser(userDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(user);
	}

	// Get user by ID
	@GetMapping("/{id}")
	public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
		UserResponseDto user = userService.getUserById(id);
		return ResponseEntity.ok(user);
	}
}
