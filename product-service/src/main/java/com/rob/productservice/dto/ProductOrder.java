package com.rob.productservice.dto;

import lombok.Builder;

import java.util.Map;

@Builder
public record ProductOrder(Map<Integer, Integer> productToQuantity) {
}
