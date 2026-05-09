package com.india_trade_expo.ind_trade_expo.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "contact_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
}
