package com.india_trade_expo.ind_trade_expo.service;

import com.india_trade_expo.ind_trade_expo.model.Exhibitor;
import com.india_trade_expo.ind_trade_expo.model.Ticket;
import com.india_trade_expo.ind_trade_expo.model.User;
import com.india_trade_expo.ind_trade_expo.repository.ExhibitorRepository;
import com.india_trade_expo.ind_trade_expo.repository.TicketRepository;
import com.india_trade_expo.ind_trade_expo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdminServiceTest {

    @Mock
    UserRepository userRepository;

    @Mock
    TicketRepository ticketRepository;

    @Mock
    ExhibitorRepository exhibitorRepository;

    @InjectMocks
    AdminService adminService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(new User(), new User()));
        List<User> result = adminService.getAllUsers();
        assertEquals(2, result.size());
    }

    @Test
    void testUpdateExhibitorStatus() {
        Exhibitor exhibitor = new Exhibitor();
        exhibitor.setId("ex123");
        exhibitor.setStatus("PENDING");

        when(exhibitorRepository.findById("ex123")).thenReturn(Optional.of(exhibitor));
        when(exhibitorRepository.save(any(Exhibitor.class))).thenAnswer(i -> i.getArguments()[0]);

        Exhibitor result = adminService.updateExhibitorStatus("ex123", "APPROVED");

        assertEquals("APPROVED", result.getStatus());
        verify(exhibitorRepository, times(1)).save(exhibitor);
    }
}
