package com.india_trade_expo.ind_trade_expo.config;

import com.india_trade_expo.ind_trade_expo.model.User;
import com.india_trade_expo.ind_trade_expo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@indiatradeexpo.com";
        Optional<User> existingAdmin = userRepository.findByEmail(adminEmail);

        if (existingAdmin.isEmpty()) {
            User admin = User.builder()
                    .firstName("System")
                    .lastName("Admin")
                    .email(adminEmail)
                    .password(passwordEncoder.encode("Admin@123456"))
                    .mobileNumber("+91 9999999999")
                    .company("IndiGlobal Expo")
                    .designation("Administrator")
                    .country("India")
                    .roles(new HashSet<>(Arrays.asList("ROLE_USER", "ROLE_ADMIN")))
                    .build();

            userRepository.save(admin);
            System.out.println("✅ ADMIN SEEDER: Created default admin account (" + adminEmail + ")");
        } else {
            User admin = existingAdmin.get();
            if (admin.getRoles() == null || !admin.getRoles().contains("ROLE_ADMIN")) {
                Set<String> roles = admin.getRoles() != null ? new HashSet<>(admin.getRoles()) : new HashSet<>();
                roles.add("ROLE_ADMIN");
                roles.add("ROLE_USER");
                admin.setRoles(roles);
                userRepository.save(admin);
                System.out.println("✅ ADMIN SEEDER: Updated existing admin account with ROLE_ADMIN");
            }
        }
    }
}
