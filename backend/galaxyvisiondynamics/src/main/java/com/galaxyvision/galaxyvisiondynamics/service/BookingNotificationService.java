package com.galaxyvision.galaxyvisiondynamics.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.emailservice.EmailService;
import com.galaxyvision.galaxyvisiondynamics.entity.Booking;
import com.galaxyvision.galaxyvisiondynamics.repository.BookingRepository;

@Service
public class BookingNotificationService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 0 9 * * ?") // Runs daily at 9 AM
    public void sendUpcomingBookingNotifications() {
        LocalDate today = LocalDate.now();
        LocalDate oneWeekLater = today.plusDays(7);
        LocalDate twoDaysLater = today.plusDays(2);

        // Fetching confirmed room bookings that are 1 week or 2 days away
        List<Booking> upcomingBookings = bookingRepository.findConfirmedRoomBookingsByDateRange(
            twoDaysLater, oneWeekLater
        );

        for (Booking booking : upcomingBookings) {
            String userEmail = booking.getUser().getEmail();
            String bookingId = booking.getId().toString();
            String roomName = booking.getRoom().getDescription();
            LocalDate bookingDate = booking.getCheckInDate();

            String emailBody = String.format(
                "Reminder: Your booking for %s is coming up on %s.\n\n" +
                "Booking ID: %s\n" +
                "Check-In Date: %s\n\n" +
                "Thank you for choosing Galaxy Vision!",
                roomName, bookingDate, bookingId, bookingDate
            );

            emailService.sendBookingReminderEmail(userEmail, emailBody);
        }
    }
}
