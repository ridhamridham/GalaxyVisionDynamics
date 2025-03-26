package com.galaxyvision.galaxyvisiondynamics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.galaxyvision.galaxyvisiondynamics.emailservice.EmailService;
import com.galaxyvision.galaxyvisiondynamics.entity.Payment;
import com.galaxyvision.galaxyvisiondynamics.model.PaymentRequest;
import com.galaxyvision.galaxyvisiondynamics.service.PaymentService;

@RestController
@RequestMapping("/galaxyvision/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<Payment> processPayment(@RequestBody PaymentRequest paymentRequest) {
        try {
            Payment payment = paymentService.processPayment(paymentRequest);

            String userEmail = paymentRequest.getUserEmail();
            long bookingId = paymentRequest.getBookingId();
            double totalAmount = paymentRequest.getAmount();
            String bookedItem = paymentRequest.getTargetType() + ": " + paymentRequest.getTargetId();

            String emailBody = String.format(
                "Your booking has been confirmed!\n\n" +
                "Booking ID: %s\n" +
                "Booked Item: %s\n" +
                "Total Amount: $%.2f\n\n" +
                "Thank you for choosing Galaxy Vision!",
                bookingId, bookedItem, totalAmount
            );

            emailService.sendBookingConfirmationEmail(userEmail, emailBody);
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
