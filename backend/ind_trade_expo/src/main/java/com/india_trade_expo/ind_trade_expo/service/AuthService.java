package com.india_trade_expo.ind_trade_expo.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.india_trade_expo.ind_trade_expo.model.User;
import com.india_trade_expo.ind_trade_expo.model.Exhibitor;
import com.india_trade_expo.ind_trade_expo.repository.UserRepository;
import com.india_trade_expo.ind_trade_expo.repository.ExhibitorRepository;
import com.india_trade_expo.ind_trade_expo.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    ExhibitorRepository exhibitorRepository;

    private static final String CLIENT_ID = "722892188739-0vhusmm3efogu28v3jjur1vbs6u0d8q7.apps.googleusercontent.com";

    public String authenticateUser(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtUtils.generateJwtToken(authentication);
    }

    public void registerVisitor(String firstName, String lastName, String email, String password, String mobileNumber, String company, String designation, String country) {
        User user = User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .password(encoder.encode(password))
                .mobileNumber(mobileNumber)
                .company(company)
                .designation(designation)
                .country(country)
                .roles(new HashSet<>(Collections.singletonList("ROLE_USER")))
                .build();

        userRepository.save(user);
    }

    public void registerExhibitor(String firstName, String lastName, String email, String password, String mobileNumber, String country, String designation, String companyName, String sector, String website) {
        User user = User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .password(encoder.encode(password))
                .mobileNumber(mobileNumber)
                .company(companyName)
                .designation(designation)
                .country(country)
                .roles(new HashSet<>(Collections.singletonList("ROLE_USER"))) // Initial role as USER, status PENDING
                .build();

        User savedUser = userRepository.save(user);

        Exhibitor exhibitor = new Exhibitor();
        exhibitor.setUserId(savedUser.getId());
        exhibitor.setCompanyName(companyName);
        exhibitor.setSector(sector);
        exhibitor.setWebsite(website);
        exhibitor.setStatus("PENDING");
        exhibitor.setRegistrationDate(java.time.LocalDateTime.now());

        exhibitorRepository.save(exhibitor);
    }

    @org.springframework.transaction.annotation.Transactional
    public String processGoogleLogin(String token) throws Exception {
        System.out.println("Verifying Google token: " + (token != null ? token.substring(0, Math.min(token.length(), 10)) + "..." : "null"));
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                System.out.println("Google token verified for email: " + email);

                // Admin Constraint: Check if user exists and is an admin
                userRepository.findByEmail(email).ifPresent(user -> {
                    if (user.getRoles().contains("ROLE_ADMIN")) {
                        throw new RuntimeException("Admins must login with email and password!");
                    }
                });

                String firstName = (String) payload.get("given_name");
                String lastName = (String) payload.get("family_name");

                User user = userRepository.findByEmail(email).orElseGet(() -> {
                    System.out.println("Creating new user for Google email: " + email);
                    User newUser = User.builder()
                            .firstName(firstName)
                            .lastName(lastName)
                            .email(email)
                            .password(encoder.encode("GOOGLE_AUTH_" + UUID.randomUUID()))
                            .roles(new HashSet<>(Collections.singletonList("ROLE_USER")))
                            .build();
                    User saved = userRepository.save(newUser);
                    System.out.println("New Google user saved with ID: " + saved.getId());
                    return saved;
                });

                return jwtUtils.generateJwtTokenFromUsername(user.getEmail());
            } else {
                System.err.println("GoogleIdToken is null - token verification failed");
                throw new RuntimeException("Invalid Google token - verification failed");
            }
        } catch (Exception e) {
            System.err.println("Error during Google token verification: " + e.getMessage());
            throw e;
        }
    }
}
