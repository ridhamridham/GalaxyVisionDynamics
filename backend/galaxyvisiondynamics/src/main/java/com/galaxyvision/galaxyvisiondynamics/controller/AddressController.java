package com.galaxyvision.galaxyvisiondynamics.controller;

import org.springframework.web.bind.annotation.*;

import com.galaxyvision.galaxyvisiondynamics.entity.Address;
import com.galaxyvision.galaxyvisiondynamics.entity.User;
import com.galaxyvision.galaxyvisiondynamics.model.AddressVo;
import com.galaxyvision.galaxyvisiondynamics.service.AddressService;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/galaxyvision/users/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping("/add")
    public ResponseEntity<Address> addAddress(@RequestBody AddressVo address) {
    	Address savedAddress = addressService.addAddress(address);
        System.out.println("Saving address");
        return ResponseEntity.ok(savedAddress);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Address>> getAddresses(@RequestParam Long userId) {
        List<Address> addresses = addressService.getAddresses(userId);
        return ResponseEntity.ok(addresses);
    }
}
