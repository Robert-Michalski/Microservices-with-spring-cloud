package com.rob.orderservice.dto;

public record OrderDetailsResponse(Long id, long productId, int quantity, long orderId) {
}
