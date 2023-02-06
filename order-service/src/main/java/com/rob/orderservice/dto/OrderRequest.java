package com.rob.orderservice.dto;

public record OrderRequest(long productId, int quantity, Long customerId) {
}
