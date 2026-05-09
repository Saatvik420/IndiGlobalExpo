package com.india_trade_expo.ind_trade_expo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "contact_messages")
public class ContactMessage {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String subject;
    private String message;
    private LocalDateTime createdAt;
    private boolean read;

    public ContactMessage() {}

    public ContactMessage(String id, String firstName, String lastName, String email, String mobile, String subject, String message, LocalDateTime createdAt, boolean read) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobile = mobile;
        this.subject = subject;
        this.message = message;
        this.createdAt = createdAt;
        this.read = read;
    }

    public static ContactMessageBuilder builder() {
        return new ContactMessageBuilder();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public boolean isRead() { return read; }
    public void setRead(boolean read) { this.read = read; }

    public static class ContactMessageBuilder {
        private String id;
        private String firstName;
        private String lastName;
        private String email;
        private String mobile;
        private String subject;
        private String message;
        private LocalDateTime createdAt;
        private boolean read;

        public ContactMessageBuilder id(String id) { this.id = id; return this; }
        public ContactMessageBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public ContactMessageBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public ContactMessageBuilder email(String email) { this.email = email; return this; }
        public ContactMessageBuilder mobile(String mobile) { this.mobile = mobile; return this; }
        public ContactMessageBuilder subject(String subject) { this.subject = subject; return this; }
        public ContactMessageBuilder message(String message) { this.message = message; return this; }
        public ContactMessageBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public ContactMessageBuilder read(boolean read) { this.read = read; return this; }

        public ContactMessage build() {
            return new ContactMessage(id, firstName, lastName, email, mobile, subject, message, createdAt, read);
        }
    }
}
