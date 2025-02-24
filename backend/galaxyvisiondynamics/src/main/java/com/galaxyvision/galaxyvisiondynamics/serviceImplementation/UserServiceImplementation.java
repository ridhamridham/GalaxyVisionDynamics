package com.galaxyvision.galaxyvisiondynamics.serviceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.entity.User;
import com.galaxyvision.galaxyvisiondynamics.model.LoginRequestVo;
import com.galaxyvision.galaxyvisiondynamics.model.LoginResponseVo;
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
       
		User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordUtil.verifyPassword(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponseVo(user.getId(), user.getName(), user.getEmail(), user.getRole().name(), token);
    }

}
