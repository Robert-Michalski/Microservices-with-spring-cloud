package com.rob.orderservice.dto;

import java.util.Map;

public record NewOrderRequest(Map<Long, Integer> productIdsToQuantity, Long customerId) {
}
