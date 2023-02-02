package com.rob.orderservice.dto;

import lombok.Builder;

import java.util.Map;
@Builder
public record OrderDetailsRequest(Map<Long, Integer> productIdsToQuantity) {
}
