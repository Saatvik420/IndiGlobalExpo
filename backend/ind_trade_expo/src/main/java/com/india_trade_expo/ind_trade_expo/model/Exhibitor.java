package com.india_trade_expo.ind_trade_expo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "exhibitors")
public class Exhibitor {
    @Id
    private String id;
    private String userId; // Link to the user who registered
    private String companyName;
    private String sector;
    private String website;
    private String status; // PENDING, APPROVED, REJECTED
    private LocalDateTime registrationDate;

    public Exhibitor() {}

    public Exhibitor(String id, String userId, String companyName, String sector, String website, String status, LocalDateTime registrationDate) {
        this.id = id;
        this.userId = userId;
        this.companyName = companyName;
        this.sector = sector;
        this.website = website;
        this.status = status;
        this.registrationDate = registrationDate;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(LocalDateTime registrationDate) { this.registrationDate = registrationDate; }
}
