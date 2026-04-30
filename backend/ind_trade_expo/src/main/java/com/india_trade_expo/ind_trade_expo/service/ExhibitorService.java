package com.india_trade_expo.ind_trade_expo.service;

import com.india_trade_expo.ind_trade_expo.model.Exhibitor;
import com.india_trade_expo.ind_trade_expo.model.User;
import com.india_trade_expo.ind_trade_expo.repository.ExhibitorRepository;
import com.india_trade_expo.ind_trade_expo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ExhibitorService {
    @Autowired
    ExhibitorRepository exhibitorRepository;

    @Autowired
    UserRepository userRepository;

    public Exhibitor applyAsExhibitor(String companyName, String sector, String website) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Exhibitor exhibitor = new Exhibitor();
        exhibitor.setUserId(user.getId());
        exhibitor.setCompanyName(companyName);
        exhibitor.setSector(sector);
        exhibitor.setWebsite(website);
        exhibitor.setStatus("PENDING");
        exhibitor.setRegistrationDate(LocalDateTime.now());

        return exhibitorRepository.save(exhibitor);
    }

    public Exhibitor getMyApplication() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        return exhibitorRepository.findByUserId(user.getId()).orElse(null);
    }
}
