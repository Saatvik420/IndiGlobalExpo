package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.model.ContactMessage;
import com.india_trade_expo.ind_trade_expo.model.Exhibitor;
import com.india_trade_expo.ind_trade_expo.model.User;
import com.india_trade_expo.ind_trade_expo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
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
    public ResponseEntity<List<com.india_trade_expo.ind_trade_expo.model.Ticket>> getAllTickets() {
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
    public ResponseEntity<?> getAllQueries() {
        try {
            System.out.println("Admin API: Fetching all queries...");
            List<ContactMessage> queries = adminService.getAllQueries();
            System.out.println("Admin API: Successfully fetched " + queries.size() + " queries.");
            return ResponseEntity.ok(queries);
        } catch (Exception e) {
            System.err.println("Admin API Error in /queries: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Admin API Error: " + e.getMessage());
        }
    }

    @GetMapping("/queries/test")
    public ResponseEntity<String> testAdminApi() {
        return ResponseEntity.ok("Admin API is reachable and you are authorized!");
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
