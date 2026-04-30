package com.india_trade_expo.ind_trade_expo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "tickets")
public class Ticket {
    @Id
    private String id;
    private String userId;
    private String ticketType; // e.g., Visitor, Exhibitor
    private Double price;
    private String bookingId; // e.g., #IGX-XXXXXX
    private LocalDateTime purchaseDate;
    private String paymentStatus; // PENDING, PAID, FAILED
    private String stripePaymentIntentId;

    public Ticket() {}

    public Ticket(String id, String userId, String ticketType, Double price, String bookingId, LocalDateTime purchaseDate, String paymentStatus, String stripePaymentIntentId) {
        this.id = id;
        this.userId = userId;
        this.ticketType = ticketType;
        this.price = price;
        this.bookingId = bookingId;
        this.purchaseDate = purchaseDate;
        this.paymentStatus = paymentStatus;
        this.stripePaymentIntentId = stripePaymentIntentId;
    }

    public static TicketBuilder builder() {
        return new TicketBuilder();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getTicketType() { return ticketType; }
    public void setTicketType(String ticketType) { this.ticketType = ticketType; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }
    public LocalDateTime getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDateTime purchaseDate) { this.purchaseDate = purchaseDate; }
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public String getStripePaymentIntentId() { return stripePaymentIntentId; }
    public void setStripePaymentIntentId(String stripePaymentIntentId) { this.stripePaymentIntentId = stripePaymentIntentId; }

    public static class TicketBuilder {
        private String id;
        private String userId;
        private String ticketType;
        private Double price;
        private String bookingId;
        private LocalDateTime purchaseDate;
        private String paymentStatus;
        private String stripePaymentIntentId;

        public TicketBuilder id(String id) { this.id = id; return this; }
        public TicketBuilder userId(String userId) { this.userId = userId; return this; }
        public TicketBuilder ticketType(String ticketType) { this.ticketType = ticketType; return this; }
        public TicketBuilder price(Double price) { this.price = price; return this; }
        public TicketBuilder bookingId(String bookingId) { this.bookingId = bookingId; return this; }
        public TicketBuilder purchaseDate(LocalDateTime purchaseDate) { this.purchaseDate = purchaseDate; return this; }
        public TicketBuilder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public TicketBuilder stripePaymentIntentId(String stripePaymentIntentId) { this.stripePaymentIntentId = stripePaymentIntentId; return this; }

        public Ticket build() {
            return new Ticket(id, userId, ticketType, price, bookingId, purchaseDate, paymentStatus, stripePaymentIntentId);
        }
    }
}
