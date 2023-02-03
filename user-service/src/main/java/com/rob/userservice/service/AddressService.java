package com.rob.userservice.service;

import com.rob.userservice.dto.AddressRequest;
import com.rob.userservice.dto.AddressResponse;
import com.rob.userservice.entity.Address;
import com.rob.userservice.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressResponse addAddress(AddressRequest addressRequest) {

        Address addressToSave = addressRepository.save(AddressUtils.toEntity(addressRequest));

        return AddressUtils.toDto(addressToSave);
    }
}
