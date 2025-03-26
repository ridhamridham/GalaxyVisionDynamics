package com.galaxyvision.galaxyvisiondynamics.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.entity.Card;
import com.galaxyvision.galaxyvisiondynamics.model.CardRequestDto;
import com.galaxyvision.galaxyvisiondynamics.repository.CardRepository;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public List<Card> getCardsByUserId(Long userId) {
        return cardRepository.findByUserId(userId);
    }

    public Card addCard(CardRequestDto cardRequestDto) {
        String salt = generateSalt();

        String cardNumberHash = hashCardNumber(cardRequestDto.getCardNumber(), salt);

        Card card = new Card();
        card.setUserId(cardRequestDto.getUserId());
        card.setCardNumberHash(cardNumberHash);
        card.setLastFourDigits(cardRequestDto.getCardNumber().substring(cardRequestDto.getCardNumber().length() - 4));
        card.setExpiryDate(cardRequestDto.getExpiryDate());
        card.setSalt(salt);

        return cardRepository.save(card);
    }

    // Generate a random salt
    private String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    private String hashCardNumber(String cardNumber, String salt) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String cardNumberWithSalt = cardNumber + salt;
            byte[] hashBytes = digest.digest(cardNumberWithSalt.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not found", e);
        }
    }

    public boolean verifyCardNumber(String cardNumber, String storedHash, String salt) {
        String hashedCardNumber = hashCardNumber(cardNumber, salt);
        return hashedCardNumber.equals(storedHash);
    }
}