package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.model.Exhibitor;
import com.india_trade_expo.ind_trade_expo.model.User;
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
        System.out.println("Admin API: Fetching all users...");
        List<User> users = adminService.getAllUsers();
        System.out.println("Admin API: Found " + users.size() + " users.");
        return ResponseEntity.ok(users);
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
}
