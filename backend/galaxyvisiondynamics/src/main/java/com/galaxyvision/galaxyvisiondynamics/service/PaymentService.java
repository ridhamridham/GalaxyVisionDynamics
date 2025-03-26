package com.galaxyvision.galaxyvisiondynamics.service;

import com.galaxyvision.galaxyvisiondynamics.entity.Payment;
import com.galaxyvision.galaxyvisiondynamics.model.PaymentRequest;
import com.galaxyvision.galaxyvisiondynamics.repository.PaymentRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private LoyaltyService loyaltyService;

    @Autowired
    private BookingService bookingService;

    @Transactional
    public Payment processPayment(PaymentRequest paymentRequest) {
        bookingService.confirmBooking(paymentRequest.getBookingId());

        // Calculate loyalty points earned
        int pointsEarned = loyaltyService.calculateLoyaltyPoints(
            paymentRequest.getUserId(),
            paymentRequest.getAmount(),
            paymentRequest.getTargetId(),
            paymentRequest.getTargetType()
        );

        Payment payment = new Payment();
        payment.setBookingId(paymentRequest.getBookingId());
        payment.setAmount(paymentRequest.getAmount());
        payment.setPaymentMethod(paymentRequest.getPaymentMethod());
        payment.setLoyaltyPointsUsed(paymentRequest.getLoyaltyPointsUsed());
        payment.setStatus("success");
        Payment savedPayment = paymentRepository.save(payment);

        // Update loyalty points
        loyaltyService.addLoyaltyTransaction(
            paymentRequest.getUserId(),
            pointsEarned,
            paymentRequest.getLoyaltyPointsUsed(),
            paymentRequest.getBookingId(),
            "Payment"
        );

        return savedPayment;
    }
}