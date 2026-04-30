package com.india_trade_expo.ind_trade_expo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    
    @JsonProperty("mobile")
    private String mobileNumber;
    private String company;
    private String designation;
    private String country;

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
}
