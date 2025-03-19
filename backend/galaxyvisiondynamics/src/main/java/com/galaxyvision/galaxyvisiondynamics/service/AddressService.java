package com.galaxyvision.galaxyvisiondynamics.service;

import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.entity.Address;
import com.galaxyvision.galaxyvisiondynamics.entity.User;
import com.galaxyvision.galaxyvisiondynamics.model.AddressVo;
import com.galaxyvision.galaxyvisiondynamics.repository.AddressRepository;
import com.galaxyvision.galaxyvisiondynamics.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private UserRepository userRepo;

    // Add a new address
    public Address addAddress(AddressVo address) {
    	Optional<User> userdb = userRepo.findById(address.getUserId());
    	Address addressEntity = new Address();
    	addressEntity.setAddressLine1(address.getAddressLine1());
    	addressEntity.setAddressLine2(address.getAddressLine2());
    	addressEntity.setCity(address.getCity());
    	addressEntity.setState(address.getState());
    	addressEntity.setZipCode(address.getZipCode());
    	addressEntity.setCountry(address.getCountry());
    	User user = userdb.orElseThrow(() -> new RuntimeException("User not found"));
    	addressEntity.setUser(user);
        
    	
        return addressRepository.save(addressEntity);
    }

    // Get all addresses for a user
    public List<Address> getAddresses(Long userId) {
        return addressRepository.findByUserId(userId);
    }
}
