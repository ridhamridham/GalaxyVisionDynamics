package com.galaxyvision.galaxyvisiondynamics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.galaxyvision.galaxyvisiondynamics.entity.User;
import com.galaxyvision.galaxyvisiondynamics.service.UserService;

@RestController
@RequestMapping("/galaxyvision/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
        	System.out.println("inside controller");
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (RuntimeException e) {
        	System.out.println("exception occurred!!!" +e.getMessage());
        	e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
