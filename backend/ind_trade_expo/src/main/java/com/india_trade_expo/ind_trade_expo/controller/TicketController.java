package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.dto.TicketPurchaseRequest;
import com.india_trade_expo.ind_trade_expo.model.Ticket;
import com.india_trade_expo.ind_trade_expo.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    TicketService ticketService;

    /* 
    @PostMapping("/purchase")
    public ResponseEntity<?> purchaseTicket(@RequestBody TicketPurchaseRequest request) {
        try {
            return ResponseEntity.ok(ticketService.initiatePurchase(request.getTicketType(), request.getPrice()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestParam String paymentIntentId) {
        try {
            return ResponseEntity.ok(ticketService.verifyPayment(paymentIntentId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    */

    @GetMapping("/history")
    public ResponseEntity<List<Ticket>> getHistory() {
        return ResponseEntity.ok(ticketService.getHistory());
    }
}
