package com.myApp.bookMyShow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TheaterCreateDto {
    
    @NotBlank(message = "Theater name is required")
    @Size(min = 2, max = 50, message = "Theater name must be between 2 and 50 characters")
    private String name;
    
    @NotBlank(message = "Location is required")
    @Size(min = 3, max = 100, message = "Location must be between 3 and 100 characters")
    private String location;
}