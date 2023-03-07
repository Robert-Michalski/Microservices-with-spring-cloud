package com.rob.orderservice.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ReceivedItemResponse(String productName, int quantity, double price, long orderId, long productId, long userId, LocalDateTime orderDate, long addressId) {
}
