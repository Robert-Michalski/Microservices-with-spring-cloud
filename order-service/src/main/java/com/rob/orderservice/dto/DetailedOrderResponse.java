package com.rob.orderservice.dto;

import com.rob.orderservice.entity.Status;
import lombok.Builder;

import java.util.Date;

@Builder
public record DetailedOrderResponse(Long id, String productName, int quantity, int customerId, Date orderDate, Status status) {
}
