package com.myApp.bookMyShow.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieCreateDto {
    
    @NotBlank(message = "Movie title is required")
    @Size(min = 1, max = 100, message = "Movie title must be between 1 and 100 characters")
    private String title;
    
    @NotBlank(message = "Genre is required")
    @Size(min = 2, max = 30, message = "Genre must be between 2 and 30 characters")
    private String genre;
    
    @Min(value = 1, message = "Duration must be at least 1 minute")
    private int duration;
    
    @NotBlank(message = "Language is required")
    @Size(min = 2, max = 20, message = "Language must be between 2 and 20 characters")
    private String language;
}