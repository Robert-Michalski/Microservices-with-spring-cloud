package com.rob.orderservice.dto;

import com.rob.orderservice.entity.Status;
import lombok.Builder;

import java.time.LocalDate;
import java.util.Date;

@Builder
public record OrderResponse(Long id, int productId, int quantity, int customerId, Date orderDate, Status status) {
}
