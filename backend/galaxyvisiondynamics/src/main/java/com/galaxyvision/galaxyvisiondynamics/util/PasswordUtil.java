package com.galaxyvision.galaxyvisiondynamics.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component // Marks this class as a Spring component
public class PasswordUtil {
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * Hashes a password.
     *
     * @param password The password to hash.
     * @return The hashed password.
     */
    public String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    /**
     * Verifies if a raw password matches a hashed password.
     *
     * @param rawPassword     The raw password.
     * @param encodedPassword The hashed password.
     * @return True if the passwords match, otherwise false.
     */
    public boolean matches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
