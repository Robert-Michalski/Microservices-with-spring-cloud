package com.rob.productservice.dto;

public record ProductStockRequest(long productId, int quantity, Long customerId) {
}
