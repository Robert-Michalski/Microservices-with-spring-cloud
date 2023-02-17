package com.rob.productservice.dto;

import com.rob.productservice.entity.Category;
import com.rob.productservice.entity.ProductDetails;
import lombok.Builder;

@Builder
public record ProductResponse(Long id, String name, Category category, double price, String details, int quantity, byte[] image, ProductDetails productDetails) {
}
