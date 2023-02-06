package com.rob.orderservice.dto;

import lombok.Builder;

@Builder
public record OrderRequest(long productId, int quantity, Long customerId) {
}
