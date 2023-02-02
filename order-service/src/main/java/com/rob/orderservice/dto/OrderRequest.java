package com.rob.orderservice.dto;

import jakarta.validation.constraints.Positive;
import lombok.Builder;

@Builder
public record OrderRequest(int productId, @Positive int quantity, int customerId) {
}
