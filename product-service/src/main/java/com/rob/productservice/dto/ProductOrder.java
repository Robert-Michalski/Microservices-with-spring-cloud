package com.rob.productservice.dto;

import lombok.Builder;

@Builder
public record ProductOrder(Long productId, int quantity) {
}
