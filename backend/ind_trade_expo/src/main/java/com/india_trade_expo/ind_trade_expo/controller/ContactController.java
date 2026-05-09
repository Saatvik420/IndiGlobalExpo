package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.model.ContactMessage;
import com.india_trade_expo.ind_trade_expo.repository.ContactMessageRepository;
import com.india_trade_expo.ind_trade_expo.service.EmailService;
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

    @Autowired
    EmailService emailService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitContactForm(@RequestBody ContactMessage message) {
        message.setCreatedAt(LocalDateTime.now());
        message.setRead(false);
        
        contactMessageRepository.save(message);
        
        return ResponseEntity.ok("Message submitted successfully");
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    @PutMapping("/read/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> markAsRead(@PathVariable String id) {
        return contactMessageRepository.findById(id)
                .map(msg -> {
                    msg.setRead(true);
                    contactMessageRepository.save(msg);
                    return ResponseEntity.ok("Message marked as read");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteMessage(@PathVariable String id) {
        contactMessageRepository.deleteById(id);
        return ResponseEntity.ok("Message deleted successfully");
    }
}
