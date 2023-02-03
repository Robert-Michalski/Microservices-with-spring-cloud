package com.rob.userservice.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

@Builder
public record AddressRequest(
        long userId,
        @NotEmpty String address,
        @NotEmpty String city,
        @NotEmpty String country,
        @NotEmpty String postalCode
        ) {
}
