package com.galaxyvision.galaxyvisiondynamics.util;

import org.springframework.stereotype.Component;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Component
public class PasswordUtil {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * Hashes a plain-text password using BCrypt.
     *
     * @param plainPassword The plain-text password to hash.
     * @return The hashed password.
     */
    public String hashPassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    /**
     * Verifies if the plain-text password matches the hashed password.
     *
     * @param plainPassword The plain-text password provided by the user.
     * @param hashedPassword The hashed password stored in the database.
     * @return True if the passwords match, false otherwise.
     */
    public boolean verifyPassword(String plainPassword, String hashedPassword) {
        return passwordEncoder.matches(plainPassword, hashedPassword);
    }
}
