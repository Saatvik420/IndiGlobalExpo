package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    EmailService emailService;

    @GetMapping("/send-mail")
    public ResponseEntity<String> testMail() {
        try {
            System.out.println("--- MANUAL MAIL TEST TRIGGERED ---");
            emailService.sendSystemHealthEmail();
            return ResponseEntity.ok("Test email sent! Check your inbox.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Mail test failed: " + e.getMessage());
        }
    }
}
