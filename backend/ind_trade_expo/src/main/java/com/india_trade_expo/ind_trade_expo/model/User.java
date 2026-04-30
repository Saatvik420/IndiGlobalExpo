package com.india_trade_expo.ind_trade_expo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String mobileNumber;
    private String company;
    private String designation;
    private String country;
    private Set<String> roles;

    public User() {}

    public User(String id, String firstName, String lastName, String email, String password, String mobileNumber, String company, String designation, String country, Set<String> roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.company = company;
        this.designation = designation;
        this.country = country;
        this.roles = roles;
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
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
    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }

    public static class UserBuilder {
        private String id;
        private String firstName;
        private String lastName;
        private String email;
        private String password;
        private String mobileNumber;
        private String company;
        private String designation;
        private String country;
        private Set<String> roles;

        public UserBuilder id(String id) { this.id = id; return this; }
        public UserBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public UserBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder mobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; return this; }
        public UserBuilder company(String company) { this.company = company; return this; }
        public UserBuilder designation(String designation) { this.designation = designation; return this; }
        public UserBuilder country(String country) { this.country = country; return this; }
        public UserBuilder roles(Set<String> roles) { this.roles = roles; return this; }

        public User build() {
            return new User(id, firstName, lastName, email, password, mobileNumber, company, designation, country, roles);
        }
    }
}
