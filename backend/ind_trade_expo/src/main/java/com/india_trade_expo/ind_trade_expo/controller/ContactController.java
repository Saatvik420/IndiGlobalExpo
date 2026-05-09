package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.model.ContactMessage;
import com.india_trade_expo.ind_trade_expo.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    ContactMessageRepository contactMessageRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submitContactForm(@RequestBody ContactMessage message) {
        try {
            // Save date as a formatted string for cross-platform stability
            message.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            message.setRead(false);
            contactMessageRepository.save(message);
            return ResponseEntity.ok("Message submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error saving message: " + e.getMessage());
        }
    }
}
