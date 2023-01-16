package com.rob.productservice.service;

import com.rob.productservice.dto.ProductRequest;
import com.rob.productservice.dto.ProductResponse;
import com.rob.productservice.entity.Product;

public class ProductUtil {

    public static ProductResponse toDto(Product product){
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .category(product.getCategory())
                .price(product.getPrice())
                .details(product.getDetails())
                .quantity(product.getQuantity())
                .build();
    }

    public static Product toEntity(ProductRequest productRequest){
        return Product.builder()
                .name(productRequest.name())
                .category(productRequest.category())
                .price(productRequest.price())
                .details(productRequest.details())
                .quantity(productRequest.quantity())
                .build();
    }
}
