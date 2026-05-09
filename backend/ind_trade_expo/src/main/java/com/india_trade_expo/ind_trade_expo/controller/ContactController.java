package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.model.ContactMessage;
import com.india_trade_expo.ind_trade_expo.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    ContactMessageRepository contactMessageRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submitContactForm(@RequestBody ContactMessage message) {
        try {
            message.setCreatedAt(LocalDateTime.now());
            message.setRead(false);
            contactMessageRepository.save(message);
            return ResponseEntity.ok("Message submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error saving message: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getAllMessages() {
        try {
            System.out.println("Contact API: Fetching all messages...");
            List<ContactMessage> messages = contactMessageRepository.findAll();
            System.out.println("Contact API: Found " + messages.size() + " messages.");
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            System.err.println("Contact API Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Database Error: " + e.getMessage());
        }
    }

    @PutMapping("/read/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> markAsRead(@PathVariable String id) {
        try {
            return contactMessageRepository.findById(id)
                    .map(msg -> {
                        msg.setRead(true);
                        contactMessageRepository.save(msg);
                        return ResponseEntity.ok("Message marked as read");
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error updating message: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteMessage(@PathVariable String id) {
        try {
            contactMessageRepository.deleteById(id);
            return ResponseEntity.ok("Message deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error deleting message: " + e.getMessage());
        }
    }
}
