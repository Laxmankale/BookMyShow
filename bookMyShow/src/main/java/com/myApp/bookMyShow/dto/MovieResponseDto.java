package com.myApp.bookMyShow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieResponseDto {
    
    private Long id;
    private String title;
    private String genre;
    private int duration;
    private String language;
}