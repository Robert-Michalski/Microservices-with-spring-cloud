package com.rob.orderservice.dto;

import lombok.Builder;

@Builder
public record CartItemResponse(String productName, double price, int quantity, long orderId) {
}
