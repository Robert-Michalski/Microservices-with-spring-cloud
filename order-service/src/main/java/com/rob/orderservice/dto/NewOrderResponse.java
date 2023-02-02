package com.rob.orderservice.dto;

import com.rob.orderservice.entity.Status;
import lombok.Builder;

import java.util.Date;

@Builder
public record NewOrderResponse(Long id, long customerId, Date orderDate, Status status) {
}
