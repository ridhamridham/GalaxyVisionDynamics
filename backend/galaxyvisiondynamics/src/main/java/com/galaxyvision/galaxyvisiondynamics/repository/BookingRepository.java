package com.galaxyvision.galaxyvisiondynamics.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.galaxyvision.galaxyvisiondynamics.entity.Booking;
import com.galaxyvision.galaxyvisiondynamics.entity.Payment;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
	@Query("SELECT b FROM Booking b WHERE b.status = 'CONFIRMED' AND b.room IS NOT NULL AND b.checkInDate BETWEEN :startDate AND :endDate")
    List<Booking> findConfirmedRoomBookingsByDateRange(LocalDate startDate, LocalDate endDate);
	List<Booking> findByUserIdAndStatusIn(Long userId, List<Booking.BookingStatus> statuses);
}