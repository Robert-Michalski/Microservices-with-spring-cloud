package com.rob.productservice.dto;

import lombok.Builder;

@Builder
public record ProductRequest(String name, long categoryId, double price, String details, int quantity, Long imageId) {
}
