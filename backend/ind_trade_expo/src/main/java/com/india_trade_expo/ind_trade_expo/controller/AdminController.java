package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.model.Exhibitor;
import com.india_trade_expo.ind_trade_expo.model.User;
import com.india_trade_expo.ind_trade_expo.model.Ticket;
import com.india_trade_expo.ind_trade_expo.model.ContactMessage;
import com.india_trade_expo.ind_trade_expo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {
    @Autowired
    AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/exhibitors")
    public ResponseEntity<List<Exhibitor>> getAllExhibitors() {
        return ResponseEntity.ok(adminService.getAllExhibitors());
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(adminService.getAllTickets());
    }

    @PutMapping("/exhibitors/{id}/status")
    public ResponseEntity<Exhibitor> updateExhibitorStatus(@PathVariable String id, @RequestParam String status) {
        return ResponseEntity.ok(adminService.updateExhibitorStatus(id, status));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully!");
    }

    // --- Contact Queries ---

    @GetMapping("/queries")
    public ResponseEntity<List<ContactMessage>> getAllQueries() {
        return ResponseEntity.ok(adminService.getAllQueries());
    }

    @PutMapping("/queries/{id}/read")
    public ResponseEntity<?> markQueryAsRead(@PathVariable String id) {
        adminService.markQueryAsRead(id);
        return ResponseEntity.ok("Query marked as read");
    }

    @DeleteMapping("/queries/{id}")
    public ResponseEntity<?> deleteQuery(@PathVariable String id) {
        adminService.deleteQuery(id);
        return ResponseEntity.ok("Query deleted successfully");
    }
}
