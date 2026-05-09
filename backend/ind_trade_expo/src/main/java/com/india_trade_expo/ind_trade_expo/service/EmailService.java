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

    @Value("${MAIL_ADMIN_RECEIVER:admin@indiatradeexpo.com}")
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
    public void sendTicketConfirmation(User user, Ticket ticket) {
        String subject = "Ticket Confirmation - " + ticket.getBookingId();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm");
        
        String content = "<h1>Ticket Purchased Successfully!</h1>" +
                "<p>Hi " + user.getFirstName() + ",</p>" +
                "<p>Your ticket for <strong>" + ticket.getTicketType() + "</strong> has been confirmed.</p>" +
                "<p><strong>Booking ID:</strong> " + ticket.getBookingId() + "</p>" +
                "<p><strong>Amount Paid:</strong> $" + ticket.getPrice() + "</p>" +
                "<p><strong>Purchase Date:</strong> " + ticket.getPurchaseDate().format(formatter) + "</p>" +
                "<br><p>Show this Booking ID at the entrance for entry.</p>" +
                "<br><p>Best Regards,<br>India Trade Expo Team</p>";

        sendHtmlEmail(user.getEmail(), subject, content);
    }

    @Async
    public void sendContactUsAcknowledgment(ContactMessage message) {
        String userSubject = "We've received your inquiry: " + message.getSubject();
        String userContent = "<h1>Hi " + message.getFirstName() + ",</h1>" +
                "<p>Thank you for reaching out to us. We have received your query regarding: <strong>" + message.getSubject() + "</strong></p>" +
                "<p>Our team will review your message and get back to you shortly.</p>" +
                "<br><p>Message Summary:<br><em>" + message.getMessage() + "</em></p>" +
                "<br><p>Best Regards,<br>India Trade Expo Team</p>";

        sendHtmlEmail(message.getEmail(), userSubject, userContent);

        // Send notification to Admin
        String adminSubject = "NEW INQUIRY: " + message.getSubject();
        String adminContent = "<h1>New Contact Inquiry</h1>" +
                "<p><strong>From:</strong> " + message.getFirstName() + " " + message.getLastName() + " (" + message.getEmail() + ")</p>" +
                "<p><strong>Mobile:</strong> " + message.getMobile() + "</p>" +
                "<p><strong>Subject:</strong> " + message.getSubject() + "</p>" +
                "<p><strong>Message:</strong></p><p>" + message.getMessage() + "</p>";
        
        sendHtmlEmail(adminReceiver, adminSubject, adminContent);
    }

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
