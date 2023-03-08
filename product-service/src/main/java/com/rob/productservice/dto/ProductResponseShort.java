package com.rob.productservice.dto;

import lombok.Builder;

@Builder
public record ProductResponseShort(String productName, double price) {
}
