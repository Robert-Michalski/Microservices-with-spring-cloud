package com.rob.productservice.dto;

import lombok.Builder;
import org.springframework.web.multipart.MultipartFile;

@Builder
public record ProductRequest(String name, long categoryId, double price, String details, int quantity, MultipartFile image) {
}
