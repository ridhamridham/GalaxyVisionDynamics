package com.galaxyvision.galaxyvisiondynamics.serviceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.entity.User;
import com.galaxyvision.galaxyvisiondynamics.repository.UserRepository;
import com.galaxyvision.galaxyvisiondynamics.service.UserService;
import com.galaxyvision.galaxyvisiondynamics.util.PasswordUtil;

@Service
public class UserServiceImplementation implements UserService {
	@Autowired
    private UserRepository userRepository;
	@Autowired
    private PasswordUtil passwordUtil;
	@Override
	public User registerUser(User user) {
		System.out.println("inside serviceimpl");
		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        user.setPassword(passwordUtil.hashPassword(user.getPassword()));

        return userRepository.save(user);
	}

}
