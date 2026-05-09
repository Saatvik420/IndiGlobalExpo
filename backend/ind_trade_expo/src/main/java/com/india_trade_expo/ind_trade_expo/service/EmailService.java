package com.india_trade_expo.ind_trade_expo.service;

import com.india_trade_expo.ind_trade_expo.model.ContactMessage;
import com.india_trade_expo.ind_trade_expo.model.Ticket;
import com.india_trade_expo.ind_trade_expo.model.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.from}")
    private String fromEmail;

    @Value("${MAIL_ADMIN_RECEIVER:saatvikdon@gmail.com}")
    private String adminReceiver;

    @Async
    public void sendWelcomeEmail(User user) {
        String subject = "Welcome to India Trade Expo 2026!";
        String content = "<h1>Hello " + user.getFirstName() + ",</h1>" +
                "<p>Thank you for registering for the India Trade Expo 2026. We are excited to have you with us!</p>" +
                "<p>Your registration as a <strong>" + (user.getRoles().contains("ROLE_EXHIBITOR") ? "Exhibitor" : "Visitor") + "</strong> has been successful.</p>" +
                "<p>Stay tuned for more updates.</p>" +
                "<br><p>Best Regards,<br>India Trade Expo Team</p>";
        
        sendHtmlEmail(user.getEmail(), subject, content);
    }

    @Async
    public void sendAdminRegistrationNotification(User user) {
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

    @Async
    public void sendTicketConfirmation(User user, Ticket ticket) {
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

    // Contact acknowledgment removed as per request to show in dashboard only
    /*
    @Async
    public void sendContactUsAcknowledgment(ContactMessage message) {
        ...
    }
    */

    private void sendHtmlEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            
            mailSender.send(message);
            logger.info("Email sent successfully to: {}", to);
        } catch (MessagingException e) {
            logger.error("Failed to send email to: {}. Error: {}", to, e.getMessage());
        }
    }
}
