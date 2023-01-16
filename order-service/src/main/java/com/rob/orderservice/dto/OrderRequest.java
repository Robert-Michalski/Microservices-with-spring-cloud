package com.rob.orderservice.dto;

public record OrderRequest(int productId, int quantity, int customerId) {
}
