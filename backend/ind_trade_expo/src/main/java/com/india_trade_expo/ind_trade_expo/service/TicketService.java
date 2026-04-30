package com.india_trade_expo.ind_trade_expo.service;

import com.india_trade_expo.ind_trade_expo.dto.PaymentResponse;
import com.india_trade_expo.ind_trade_expo.model.Exhibitor;
import com.india_trade_expo.ind_trade_expo.model.Ticket;
import com.india_trade_expo.ind_trade_expo.model.User;
import com.india_trade_expo.ind_trade_expo.repository.ExhibitorRepository;
import com.india_trade_expo.ind_trade_expo.repository.TicketRepository;
import com.india_trade_expo.ind_trade_expo.repository.UserRepository;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class TicketService {
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ExhibitorRepository exhibitorRepository;

    // @Autowired
    // StripeService stripeService;

    public PaymentResponse initiatePurchase(String ticketType, Double price) throws Exception {
        System.out.println("Initiating dummy purchase for: " + ticketType + " at price: " + price);
        
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Authenticated user email: " + email);
        
        if (email == null || "anonymousUser".equals(email)) {
            throw new RuntimeException("Authentication required. Please log in again.");
        }

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found for email: " + email));

        // DUMMY PAYMENT SYSTEM: Skipping real Stripe PaymentIntent creation
        String dummyPaymentIntentId = "pi_dummy_" + generateRandomString(12);

        String bookingId = "#IGX-" + generateRandomString(6);

        Ticket ticket = Ticket.builder()
                .userId(user.getId())
                .ticketType(ticketType)
                .price(price)
                .bookingId(bookingId)
                .purchaseDate(LocalDateTime.now())
                .paymentStatus("PAID") // Mark as PAID immediately for dummy system
                .stripePaymentIntentId(dummyPaymentIntentId)
                .build();

        ticketRepository.save(ticket);
        System.out.println("Dummy ticket saved successfully with Booking ID: " + bookingId);

        // Auto-approve exhibitor if the ticket is for an exhibitor booth (Simulating success logic)
        if (ticketType != null && (ticketType.contains("Booth") || ticketType.contains("Island"))) {
            System.out.println("Processing exhibitor auto-approval for user: " + user.getId());
            Optional<Exhibitor> exhibitorOpt = exhibitorRepository.findByUserId(ticket.getUserId());
            if (exhibitorOpt.isPresent()) {
                Exhibitor exhibitor = exhibitorOpt.get();
                exhibitor.setStatus("APPROVED");
                exhibitorRepository.save(exhibitor);

                // Also update user roles
                userRepository.findById(ticket.getUserId()).ifPresent(u -> {
                    java.util.Set<String> roles = u.getRoles();
                    if (roles == null) roles = new java.util.HashSet<>();
                    roles.add("ROLE_EXHIBITOR");
                    u.setRoles(roles);
                    userRepository.save(u);
                });
                System.out.println("Exhibitor approved successfully.");
            }
        }

        return new PaymentResponse("dummy_client_secret_" + generateRandomString(10), ticket);
    }

    public Ticket verifyPayment(String paymentIntentId) throws Exception {
        // DUMMY PAYMENT SYSTEM: Bypassing Stripe verification
        /*
        PaymentIntent intent = stripeService.retrievePaymentIntent(paymentIntentId);
        
        Ticket ticket = ticketRepository.findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new RuntimeException("Ticket not found for payment intent"));

        if ("succeeded".equals(intent.getStatus())) {
            ticket.setPaymentStatus("PAID");
            ticketRepository.save(ticket);
            ...
        */
        return ticketRepository.findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new RuntimeException("Ticket not found for dummy ID"));
    }

    public List<Ticket> getHistory() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        return ticketRepository.findByUserId(user.getId());
    }

    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder result = new StringBuilder();
        Random random = new Random();
        while (length-- > 0) {
            result.append(characters.charAt(random.nextInt(characters.length())));
        }
        return result.toString();
    }
}
