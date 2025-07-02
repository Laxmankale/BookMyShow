package com.myApp.bookMyShow.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myApp.bookMyShow.dto.UserRegistrationDto;
import com.myApp.bookMyShow.dto.UserResponseDto;
import com.myApp.bookMyShow.entity.User;
import com.myApp.bookMyShow.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ModelMapper modelMapper;

    // Get all users
    public List<UserResponseDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponseDto.class))
                .collect(Collectors.toList());
    }

    // Register a new user
    public UserResponseDto registerUser(UserRegistrationDto userDto) {
        // Check if email already exists
        Optional<User> existingUser = userRepository.findByEmail(userDto.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        
        User user = modelMapper.map(userDto, User.class);
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserResponseDto.class);
    }

    // Get a specific user by ID
    public UserResponseDto getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            return modelMapper.map(userOptional.get(), UserResponseDto.class);
        }
        throw new IllegalArgumentException("User not found with id: " + id);
    }
}
