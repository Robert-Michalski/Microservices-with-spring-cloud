package com.rob.orderservice.dto;

import com.rob.orderservice.entity.Status;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Set;

@Builder
public record OrderDetailed(long orderId, long addressId, LocalDateTime orderDate, Status status, Set<ProductResponse> products) {
}
