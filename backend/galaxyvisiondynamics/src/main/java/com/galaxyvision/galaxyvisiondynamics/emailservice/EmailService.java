package com.galaxyvision.galaxyvisiondynamics.emailservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendResetPasswordEmail(String email, String resetLink) {
        try {
        	SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(email);
            mailMessage.setSubject("Password Reset Request");
            mailMessage.setText("Click the link to reset your password: " + resetLink);
            System.out.println("just before sending");
            javaMailSender.send(mailMessage);

            System.out.println("Password reset email sent successfully to: " + email);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            throw new RuntimeException("Failed to send email.", e);
        }
    }

    public void sendBookingConfirmationEmail(String email, String emailBody) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(email);
            mailMessage.setSubject("Booking Confirmation");
            mailMessage.setText(emailBody);
            javaMailSender.send(mailMessage);

            System.out.println("Booking confirmation email sent successfully to: " + email);
        } catch (Exception e) {
            System.err.println("Failed to send booking confirmation email: " + e.getMessage());
            throw new RuntimeException("Failed to send booking confirmation email.", e);
        }
    }
    
    public void sendBookingReminderEmail(String email, String emailBody) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(email);
            mailMessage.setSubject("Upcoming Booking Reminder");
            mailMessage.setText(emailBody);
            javaMailSender.send(mailMessage);

            System.out.println("Booking reminder email sent successfully to: " + email);
        } catch (Exception e) {
            System.err.println("Failed to send booking reminder email: " + e.getMessage());
            throw new RuntimeException("Failed to send booking reminder email.", e);
        }
    }
}