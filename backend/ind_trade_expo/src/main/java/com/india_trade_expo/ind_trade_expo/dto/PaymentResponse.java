package com.india_trade_expo.ind_trade_expo.dto;

import com.india_trade_expo.ind_trade_expo.model.Ticket;

public class PaymentResponse {
    private String clientSecret;
    private Ticket ticket;

    public PaymentResponse() {}

    public PaymentResponse(String clientSecret, Ticket ticket) {
        this.clientSecret = clientSecret;
        this.ticket = ticket;
    }

    public String getClientSecret() { return clientSecret; }
    public void setClientSecret(String clientSecret) { this.clientSecret = clientSecret; }
    public Ticket getTicket() { return ticket; }
    public void setTicket(Ticket ticket) { this.ticket = ticket; }
}
