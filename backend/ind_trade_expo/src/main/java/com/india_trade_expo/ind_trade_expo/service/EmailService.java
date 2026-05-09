package com.india_trade_expo.ind_trade_expo.service;

import com.india_trade_expo.ind_trade_expo.model.ContactMessage;
import com.india_trade_expo.ind_trade_expo.model.Ticket;
import com.india_trade_expo.ind_trade_expo.model.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.from}")
    private String fromEmail;

    @Value("${MAIL_ADMIN_RECEIVER:saatvikdon@gmail.com}")
    private String adminReceiver;

    public void sendSystemHealthEmail() {
        sendHtmlEmail(adminReceiver, "System Health Check", "<h1>System is Live</h1><p>The India Trade Expo notification system has started successfully.</p>");
    }

    public void sendWelcomeEmail(User user) {
        System.out.println("EMAIL DEBUG: Starting Welcome Email process for: " + user.getEmail());
        String subject = "Welcome to India Trade Expo 2026!";
        String content = "<h1>Hello " + user.getFirstName() + ",</h1>" +
                "<p>Thank you for registering for the India Trade Expo 2026. We are excited to have you with us!</p>" +
                "<p>Your registration as a <strong>" + (user.getRoles().contains("ROLE_EXHIBITOR") ? "Exhibitor" : "Visitor") + "</strong> has been successful.</p>" +
                "<p>Stay tuned for more updates.</p>" +
                "<br><p>Best Regards,<br>India Trade Expo Team</p>";
        
        sendHtmlEmail(user.getEmail(), subject, content);
    }

    public void sendAdminRegistrationNotification(User user) {
        System.out.println("EMAIL DEBUG: Starting Admin Notification for user: " + user.getEmail());
        String subject = "NEW USER REGISTERED: " + user.getFirstName() + " " + user.getLastName();
        String content = "<h1>New User Registration</h1>" +
                "<p>A new user has registered on the platform.</p>" +
                "<p><strong>Name:</strong> " + user.getFirstName() + " " + user.getLastName() + "</p>" +
                "<p><strong>Email:</strong> " + user.getEmail() + "</p>" +
                "<p><strong>Mobile:</strong> " + user.getMobileNumber() + "</p>" +
                "<p><strong>Company:</strong> " + user.getCompany() + "</p>" +
                "<p><strong>Designation:</strong> " + user.getDesignation() + "</p>" +
                "<p><strong>Country:</strong> " + user.getCountry() + "</p>" +
                "<p><strong>Role:</strong> " + (user.getRoles().contains("ROLE_EXHIBITOR") ? "Exhibitor" : "Visitor") + "</p>";
        
        sendHtmlEmail(adminReceiver, subject, content);
    }

    public void sendTicketConfirmation(User user, Ticket ticket) {
        System.out.println("EMAIL DEBUG: Starting Ticket Confirmation for: " + user.getEmail() + " (Booking: " + ticket.getBookingId() + ")");
        String subject = "Thank you for registering for the Event! - " + ticket.getBookingId();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm");
        
        String content = "<h1>Registration Confirmed!</h1>" +
                "<p>Hi " + user.getFirstName() + ",</p>" +
                "<p>Thank you for registering for the India Trade Expo 2026. Your ticket for <strong>" + ticket.getTicketType() + "</strong> is confirmed.</p>" +
                "<p><strong>Booking ID:</strong> " + ticket.getBookingId() + "</p>" +
                "<p><strong>Amount Paid:</strong> $" + ticket.getPrice() + "</p>" +
                "<p><strong>Purchase Date:</strong> " + ticket.getPurchaseDate().format(formatter) + "</p>" +
                "<br><p>Please present this Booking ID at the venue entrance.</p>" +
                "<br><p>Best Regards,<br>India Trade Expo Team</p>";

        sendHtmlEmail(user.getEmail(), subject, content);
    }

    public void sendAdminTicketNotification(User user, Ticket ticket) {
        System.out.println("EMAIL DEBUG: Starting Admin Ticket Notification for: " + ticket.getBookingId());
        String subject = "NEW TICKET PURCHASED: " + ticket.getBookingId();
        
        String content = "<h1>New Ticket Purchase Alert</h1>" +
                "<p>A user has successfully purchased a ticket.</p>" +
                "<p><strong>User:</strong> " + user.getFirstName() + " " + user.getLastName() + " (" + user.getEmail() + ")</p>" +
                "<p><strong>Ticket Type:</strong> " + ticket.getTicketType() + "</p>" +
                "<p><strong>Amount Paid:</strong> $" + ticket.getPrice() + "</p>" +
                "<p><strong>Booking ID:</strong> " + ticket.getBookingId() + "</p>" +
                "<p><strong>Payment Status:</strong> " + ticket.getPaymentStatus() + "</p>";
        
        sendHtmlEmail(adminReceiver, subject, content);
    }

    private void sendHtmlEmail(String to, String subject, String htmlContent) {
        try {
            System.out.println("EMAIL DEBUG: Connecting to SMTP server to send to: " + to);
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            
            mailSender.send(message);
            System.out.println("EMAIL DEBUG: Success! Email sent to: " + to);
        } catch (Exception e) {
            System.out.println("EMAIL DEBUG: CRITICAL FAILURE sending email to: " + to + ". Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
