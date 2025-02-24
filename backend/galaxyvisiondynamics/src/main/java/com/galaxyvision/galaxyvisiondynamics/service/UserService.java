package com.galaxyvision.galaxyvisiondynamics.service;

import com.galaxyvision.galaxyvisiondynamics.entity.User;
import com.galaxyvision.galaxyvisiondynamics.model.LoginRequestVo;
import com.galaxyvision.galaxyvisiondynamics.model.LoginResponseVo;

public interface UserService {
    
	User registerUser(User user);

	LoginResponseVo loginUser(LoginRequestVo loginRequest);
}
