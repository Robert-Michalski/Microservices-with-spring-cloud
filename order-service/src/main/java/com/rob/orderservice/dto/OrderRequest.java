package com.rob.orderservice.dto;

import java.util.Map;

public record OrderRequest(Map<Long, Integer> productIdsToQuantity, Long customerId) {
}
