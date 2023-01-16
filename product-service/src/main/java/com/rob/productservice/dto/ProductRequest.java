package com.rob.productservice.dto;

import com.rob.productservice.entity.Category;


public record ProductRequest(String name, Category category, double price, String details, int quantity) {
}
