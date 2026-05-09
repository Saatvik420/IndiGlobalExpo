package com.india_trade_expo.ind_trade_expo.service;

import com.india_trade_expo.ind_trade_expo.model.Exhibitor;
import com.india_trade_expo.ind_trade_expo.model.User;
import com.india_trade_expo.ind_trade_expo.repository.ExhibitorRepository;
import com.india_trade_expo.ind_trade_expo.repository.TicketRepository;
import com.india_trade_expo.ind_trade_expo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class AdminService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ExhibitorRepository exhibitorRepository;

    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    com.india_trade_expo.ind_trade_expo.repository.ContactMessageRepository contactMessageRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<Exhibitor> getAllExhibitors() {
        return exhibitorRepository.findAll();
    }

    public List<com.india_trade_expo.ind_trade_expo.model.Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<com.india_trade_expo.ind_trade_expo.model.ContactMessage> getAllQueries() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public void markQueryAsRead(String id) {
        contactMessageRepository.findById(id).ifPresent(msg -> {
            msg.setRead(true);
            contactMessageRepository.save(msg);
        });
    }

    public void deleteQuery(String id) {
        contactMessageRepository.deleteById(id);
    }

    public Exhibitor updateExhibitorStatus(String id, String status) {
        Exhibitor exhibitor = exhibitorRepository.findById(id).orElseThrow(() -> new RuntimeException("Exhibitor not found"));
        exhibitor.setStatus(status);
        
        if ("APPROVED".equals(status)) {
            User user = userRepository.findById(exhibitor.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
            Set<String> roles = user.getRoles();
            roles.add("ROLE_EXHIBITOR");
            user.setRoles(roles);
            userRepository.save(user);
        }
        
        return exhibitorRepository.save(exhibitor);
    }

    public void deleteUser(String userId) {
        // 1. Delete associated tickets
        ticketRepository.deleteByUserId(userId);
        
        // 2. Delete associated exhibitor record if exists
        exhibitorRepository.deleteByUserId(userId);
        
        // 3. Delete the user
        userRepository.deleteById(userId);
    }
}
