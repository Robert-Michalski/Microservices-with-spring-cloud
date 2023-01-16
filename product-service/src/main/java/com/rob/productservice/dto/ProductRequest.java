package com.rob.productservice.dto;

public record ProductRequest(String name, long categoryId, double price, String details, int quantity) {
}
