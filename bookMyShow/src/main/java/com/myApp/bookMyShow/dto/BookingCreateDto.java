package com.myApp.bookMyShow.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingCreateDto {
    
    @NotNull(message = "Number of seats is required")
    @Min(value = 1, message = "Must book at least 1 seat")
    @Max(value = 10, message = "Cannot book more than 10 seats at once")
    private Integer numberOfSeats;
    
    @NotNull(message = "User ID is required")
    private Long userId;
    
    @NotNull(message = "Show ID is required")
    private Long showId;
}