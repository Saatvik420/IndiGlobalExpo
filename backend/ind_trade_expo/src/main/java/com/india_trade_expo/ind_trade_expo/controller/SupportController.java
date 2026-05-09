package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.model.ContactMessage;
import com.india_trade_expo.ind_trade_expo.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support")
public class SupportController {

    @Autowired
    ContactMessageRepository contactMessageRepository;

    @GetMapping("/queries")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<ContactMessage>> getAllQueries() {
        return ResponseEntity.ok(contactMessageRepository.findAllByOrderByCreatedAtDesc());
    }

    @PutMapping("/queries/{id}/read")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> markAsRead(@PathVariable String id) {
        contactMessageRepository.findById(id).ifPresent(msg -> {
            msg.setRead(true);
            contactMessageRepository.save(msg);
        });
        return ResponseEntity.ok("Marked as read");
    }

    @DeleteMapping("/queries/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteQuery(@PathVariable String id) {
        contactMessageRepository.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}
