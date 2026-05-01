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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    AuthService authService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        logger.info("Backend Ping received!");
        return ResponseEntity.ok("Pong");
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        logger.info("Health check requested");
        return ResponseEntity.ok("Healthy");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("Attempting login for user: {}", loginRequest.getEmail());
        
        // 1. Check if user exists first
        if (userRepository.findByEmail(loginRequest.getEmail()).isEmpty()) {
            logger.warn("Login failed: Email {} not found", loginRequest.getEmail());
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email not found. Please register first!");
        }

        try {
            String jwt = authService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            logger.info("User {} authenticated successfully", loginRequest.getEmail());

            User user = userRepository.findByEmail(loginRequest.getEmail()).get();
            List<String> roles = user.getRoles().stream().collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(jwt,
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    roles));
        } catch (Exception e) {
            logger.error("Authentication failed for user {}: {}", loginRequest.getEmail(), e.getMessage());
            e.printStackTrace();
            return ResponseEntity
                    .badRequest()
                    .body("Error: " + e.getMessage());
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
        logger.info("Registering visitor: {}", signUpRequest.getEmail());
        
        try {
            if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
                logger.warn("Registration failed: Email {} already in use", signUpRequest.getEmail());
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
            
            logger.info("Visitor registered successfully: {}", signUpRequest.getEmail());
            return ResponseEntity.ok("Visitor registered successfully!");
        } catch (Exception e) {
            logger.error("Visitor registration failed: {}", e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/register/exhibitor")
    public ResponseEntity<?> registerExhibitor(@Valid @RequestBody ExhibitorRegisterRequest signUpRequest) {
        logger.info("Registering exhibitor: {}", signUpRequest.getEmail());
        
        try {
            if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
                logger.warn("Registration failed: Email {} already in use", signUpRequest.getEmail());
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

            logger.info("Exhibitor registered successfully: {}", signUpRequest.getEmail());
            return ResponseEntity.ok("Exhibitor registration application submitted!");
        } catch (Exception e) {
            logger.error("Exhibitor registration failed: {}", e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
