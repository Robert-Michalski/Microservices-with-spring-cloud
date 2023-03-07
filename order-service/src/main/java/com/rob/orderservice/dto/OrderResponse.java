package com.rob.orderservice.dto;

import com.rob.orderservice.entity.Status;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record OrderResponse(Long id, long customerId, LocalDateTime orderDate, Status status, long addressId) {

}
