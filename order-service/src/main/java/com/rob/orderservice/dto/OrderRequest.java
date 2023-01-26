package com.rob.orderservice.dto;

import jakarta.validation.constraints.Positive;

public record OrderRequest(int productId, @Positive int quantity, int customerId) {
}
