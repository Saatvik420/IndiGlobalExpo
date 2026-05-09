package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.model.*;
import com.india_trade_expo.ind_trade_expo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/exhibitors")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<Exhibitor>> getAllExhibitors() {
        return ResponseEntity.ok(adminService.getAllExhibitors());
    }

    @GetMapping("/tickets")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(adminService.getAllTickets());
    }

    @PutMapping("/exhibitors/{id}/status")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Exhibitor> updateExhibitorStatus(@PathVariable String id, @RequestParam String status) {
        return ResponseEntity.ok(adminService.updateExhibitorStatus(id, status));
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully!");
    }

    @GetMapping("/queries")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<ContactMessage>> getAllQueries() {
        return ResponseEntity.ok(adminService.getAllQueries());
    }

    @PutMapping("/queries/{id}/read")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> markQueryAsRead(@PathVariable String id) {
        adminService.markQueryAsRead(id);
        return ResponseEntity.ok("Query marked as read");
    }

    @DeleteMapping("/queries/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteQuery(@PathVariable String id) {
        adminService.deleteQuery(id);
        return ResponseEntity.ok("Query deleted successfully");
    }
}
