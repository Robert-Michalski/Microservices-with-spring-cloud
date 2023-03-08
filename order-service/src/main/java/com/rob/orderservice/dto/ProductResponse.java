package com.rob.orderservice.dto;

import lombok.Builder;

@Builder
public record ProductResponse(long productId, String productName, double price, int quantityOrdered) {
}
