package com.india_trade_expo.ind_trade_expo.service;

import com.india_trade_expo.ind_trade_expo.model.Exhibitor;
import com.india_trade_expo.ind_trade_expo.model.User;
import com.india_trade_expo.ind_trade_expo.repository.ExhibitorRepository;
import com.india_trade_expo.ind_trade_expo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ExhibitorServiceTest {

    @Mock
    ExhibitorRepository exhibitorRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    SecurityContext securityContext;

    @Mock
    Authentication authentication;

    @InjectMocks
    ExhibitorService exhibitorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("test@test.com");
    }

    @Test
    void testApplyAsExhibitor() {
        User user = new User();
        user.setId("user123");
        user.setEmail("test@test.com");

        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.of(user));
        when(exhibitorRepository.save(any(Exhibitor.class))).thenAnswer(i -> i.getArguments()[0]);

        Exhibitor result = exhibitorService.applyAsExhibitor("Test Corp", "IT", "www.test.com");

        assertNotNull(result);
        assertEquals("user123", result.getUserId());
        assertEquals("Test Corp", result.getCompanyName());
        assertEquals("PENDING", result.getStatus());
        verify(exhibitorRepository, times(1)).save(any(Exhibitor.class));
    }
}
