package com.myApp.bookMyShow.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowResponseDto {
    
    private Long id;
    private LocalDateTime showTime;
    private MovieResponseDto movie;
    private TheaterResponseDto theater;
}