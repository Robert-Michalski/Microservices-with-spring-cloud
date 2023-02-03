package com.rob.userservice.controller;

import com.rob.userservice.dto.AddressRequest;
import com.rob.userservice.dto.AddressResponse;
import com.rob.userservice.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AddressResponse addAddress(@RequestBody @Validated AddressRequest addressRequest){
       return addressService.addAddress(addressRequest);
    }
}
