package com.rob.productservice.dto;

import lombok.Builder;

@Builder
public record CategoryResponse(Long id,String name, byte[] image) {
}
