package com.rob.userservice.service;

import com.rob.userservice.dto.AddressRequest;
import com.rob.userservice.dto.AddressResponse;
import com.rob.userservice.entity.Address;

public class AddressUtils {

    public static Address toEntity(AddressRequest addressRequest){
        return Address.builder()
                .userId(addressRequest.userId())
                .city(addressRequest.city())
                .country(addressRequest.country())
                .address(addressRequest.address())
                .postalCode(addressRequest.postalCode())
                .build();
    }

    public static AddressResponse toDto(Address address){
        return AddressResponse.builder()
                .id(address.getId())
                .userId(address.getUserId())
                .city(address.getCity())
                .country(address.getCountry())
                .address(address.getAddress())
                .postalCode(address.getPostalCode())
                .build();
    }
}
