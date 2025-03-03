package com.galaxyvision.galaxyvisiondynamics.serviceImplementation;

import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.emailservice.EmailService;
import com.galaxyvision.galaxyvisiondynamics.entity.PasswordResetToken;
import com.galaxyvision.galaxyvisiondynamics.entity.User;
import com.galaxyvision.galaxyvisiondynamics.model.LoginRequestVo;
import com.galaxyvision.galaxyvisiondynamics.model.LoginResponseVo;
import com.galaxyvision.galaxyvisiondynamics.repository.PasswordResetTokenRepository;
import com.galaxyvision.galaxyvisiondynamics.repository.UserRepository;
import com.galaxyvision.galaxyvisiondynamics.service.UserService;
import com.galaxyvision.galaxyvisiondynamics.util.JwtUtil;
import com.galaxyvision.galaxyvisiondynamics.util.PasswordUtil;

@Service
public class UserServiceImplementation implements UserService {
	@Autowired
    private UserRepository userRepository;
	@Autowired
    private PasswordUtil passwordUtil;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
	@Autowired
    private EmailService emailService;

   @Override
	public User registerUser(User user) {
		System.out.println("inside serviceimpl");
		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        user.setPassword(passwordUtil.hashPassword(user.getPassword()));

        return userRepository.save(user);
	}
	@Override
    public LoginResponseVo loginUser(LoginRequestVo loginRequest) {
       
		User user = authenticate(loginRequest);

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponseVo(user.getId(), user.getName(), user.getEmail(), user.getRole().name(), token);
    }
	
	@Override
    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        String resetToken = UUID.randomUUID().toString();
        Date expiryDate = new Date(System.currentTimeMillis() + 15 * 60 * 1000); // 15 minutes

        PasswordResetToken token = new PasswordResetToken();
        token.setUser(user);
        token.setToken(resetToken);
        token.setExpiryDate(expiryDate);
        passwordResetTokenRepository.save(token);

        String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;
        emailService.sendResetPasswordEmail(email, resetLink);
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        // Check if the token has expired
        if (resetToken.getExpiryDate().before(new Date())) {
            throw new RuntimeException("Token has expired.");
        }

        // Update the user's password
        User user = resetToken.getUser();
        user.setPassword(passwordUtil.hashPassword(newPassword));
        userRepository.save(user);

        // Delete the token after use
        passwordResetTokenRepository.delete(resetToken);
    }
    
    private User authenticate(LoginRequestVo loginRequest) {
    	
    	User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    	
    	if (!passwordUtil.verifyPassword(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
    	
        return user;
    }

}
