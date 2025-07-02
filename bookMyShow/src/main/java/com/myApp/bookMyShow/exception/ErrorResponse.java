package com.myApp.bookMyShow.exception;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    
    private String message;
    private int statusCode;
    private LocalDateTime timestamp;
    private Map<String, String> validationErrors;
}