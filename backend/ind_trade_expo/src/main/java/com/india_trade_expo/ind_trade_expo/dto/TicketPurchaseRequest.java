package com.india_trade_expo.ind_trade_expo.dto;

public class TicketPurchaseRequest {
    private String ticketType;
    private Double price;

    public String getTicketType() { return ticketType; }
    public void setTicketType(String ticketType) { this.ticketType = ticketType; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
