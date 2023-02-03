package com.rob.userservice.dto;

import lombok.Builder;

@Builder
public record AddressResponse(Long id, long userId, String address, String city, String country, String postalCode) {
}
