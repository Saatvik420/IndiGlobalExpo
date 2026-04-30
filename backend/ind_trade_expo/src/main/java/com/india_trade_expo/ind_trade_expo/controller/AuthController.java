package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.dto.*;
import com.india_trade_expo.ind_trade_expo.model.User;
import com.india_trade_expo.ind_trade_expo.repository.UserRepository;
import com.india_trade_expo.ind_trade_expo.security.JwtUtils;
import com.india_trade_expo.ind_trade_expo.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        System.out.println("Backend Ping received!");
        return ResponseEntity.ok("Pong");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        // 1. Check if user exists first
        if (userRepository.findByEmail(loginRequest.getEmail()).isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email not found. Please register first!");
        }

        try {
            String jwt = authService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

            User user = userRepository.findByEmail(loginRequest.getEmail()).get();
            List<String> roles = user.getRoles().stream().collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(jwt,
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    roles));
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Invalid password!");
        }
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest googleLoginRequest) {
        System.out.println("Received Google login request...");
        try {
            if (googleLoginRequest.getToken() == null || googleLoginRequest.getToken().isEmpty()) {
                return ResponseEntity.badRequest().body("Error: Token is missing!");
            }

            String jwt = authService.processGoogleLogin(googleLoginRequest.getToken());
            
            String email = jwtUtils.getUserNameFromJwtToken(jwt);
            User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found after Google auth"));
            List<String> roles = user.getRoles().stream().collect(Collectors.toList());

            System.out.println("Google login successful for: " + email);
            return ResponseEntity.ok(new JwtResponse(jwt,
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    roles));
        } catch (Exception e) {
            System.err.println("Google login error: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/register/visitor")
    public ResponseEntity<?> registerVisitor(@Valid @RequestBody VisitorRegisterRequest signUpRequest) {
        System.out.println("Backend: Registering visitor for email: " + signUpRequest.getEmail());
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        authService.registerVisitor(
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getEmail(),
                signUpRequest.getPassword(),
                signUpRequest.getMobileNumber(),
                signUpRequest.getCompany(),
                signUpRequest.getDesignation(),
                signUpRequest.getCountry()
        );

        return ResponseEntity.ok("Visitor registered successfully!");
    }

    @PostMapping("/register/exhibitor")
    public ResponseEntity<?> registerExhibitor(@Valid @RequestBody ExhibitorRegisterRequest signUpRequest) {
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        authService.registerExhibitor(
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getEmail(),
                signUpRequest.getPassword(),
                signUpRequest.getMobileNumber(),
                signUpRequest.getCountry(),
                signUpRequest.getDesignation(),
                signUpRequest.getCompanyName(),
                signUpRequest.getSector(),
                signUpRequest.getWebsite()
        );

        return ResponseEntity.ok("Exhibitor registration application submitted!");
    }
}
