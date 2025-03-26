package com.galaxyvision.galaxyvisiondynamics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.entity.LoyaltySettings;
import com.galaxyvision.galaxyvisiondynamics.entity.LoyaltyTransaction;
import com.galaxyvision.galaxyvisiondynamics.entity.Promotion;
import com.galaxyvision.galaxyvisiondynamics.repository.LoyaltySettingsRepository;
import com.galaxyvision.galaxyvisiondynamics.repository.LoyaltyTransactionRepository;
import com.galaxyvision.galaxyvisiondynamics.repository.PromotionRepository;

import java.util.List;

@Service
public class LoyaltyService {

    @Autowired
    private LoyaltyTransactionRepository loyaltyTransactionRepository;

    @Autowired
    private LoyaltySettingsRepository loyaltySettingsRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    // Get the current loyalty points balance for a user
    public int getLoyaltyPoints(Long userId) {
        List<LoyaltyTransaction> transactions = loyaltyTransactionRepository.findByUserId(userId);
        int totalEarned = transactions.stream().mapToInt(LoyaltyTransaction::getPointsEarned).sum();
        int totalUsed = transactions.stream().mapToInt(LoyaltyTransaction::getPointsUsed).sum();
        return totalEarned - totalUsed;
    }

    // Add a new loyalty transaction
    public void addLoyaltyTransaction(Long userId, int pointsEarned, int pointsUsed, Long bookingId, String reason) {
        LoyaltyTransaction transaction = new LoyaltyTransaction();
        transaction.setUserId(userId);
        transaction.setPointsEarned(pointsEarned);
        transaction.setPointsUsed(pointsUsed);
        transaction.setBookingId(bookingId);
        transaction.setReason(reason);

        // Calculate the new balance
        int currentBalance = getLoyaltyPoints(userId);
        transaction.setBalanceAfterTransaction(currentBalance + pointsEarned - pointsUsed);

        // Save the transaction
        loyaltyTransactionRepository.save(transaction);
    }

    // Calculate loyalty points earned based on amount spent and promotions
    public int calculateLoyaltyPoints(Long userId, Double amountSpent, Long targetId, String targetType) {
        // Get loyalty settings (points per dollar)
        LoyaltySettings settings = loyaltySettingsRepository.findFirstByOrderByIdAsc();
        double pointsPerDollar = settings.getPointsPerDollar();

        // Calculate base points
        int basePoints = (int) (amountSpent * pointsPerDollar);

        // Check for active promotions
        List<Promotion> promotions = promotionRepository.findByTargetIdAndTargetTypeAndActive(targetId, targetType, true);
        int extraPoints = promotions.stream().mapToInt(Promotion::getExtraPoints).sum();

        // Total points earned
        return basePoints + extraPoints;
    }
}