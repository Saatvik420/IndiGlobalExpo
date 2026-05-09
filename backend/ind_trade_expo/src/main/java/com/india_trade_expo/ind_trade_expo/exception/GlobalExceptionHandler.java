package com.india_trade_expo.ind_trade_expo.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
        
        return ResponseEntity.badRequest().body("Validation Error: " + errorMessage);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeExceptions(RuntimeException ex) {
        return ResponseEntity.badRequest().body("Error: " + ex.getMessage());
    }

    @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDeniedException(org.springframework.security.access.AccessDeniedException ex) {
        return ResponseEntity.status(org.springframework.http.HttpStatus.FORBIDDEN).body("Access Denied: You do not have permission to access this resource.");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneralExceptions(Exception ex) {
        ex.printStackTrace(); // Log the stack trace to Render logs
        return ResponseEntity.internalServerError().body("An unexpected error occurred: " + ex.getMessage());
    }
}
