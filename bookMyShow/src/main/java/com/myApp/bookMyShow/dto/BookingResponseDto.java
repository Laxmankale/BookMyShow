package com.myApp.bookMyShow.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDto {
    
    private Long id;
    private int numberOfSeats;
    private LocalDateTime bookingTime;
    private UserResponseDto user;
    private ShowResponseDto show;
}