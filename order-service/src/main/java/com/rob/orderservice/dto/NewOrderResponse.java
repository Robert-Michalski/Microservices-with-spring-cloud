package com.rob.orderservice.dto;

import com.rob.orderservice.entity.Status;
import lombok.Builder;

import java.util.Date;
import java.util.Set;
@Builder
public record NewOrderResponse(Long id, Set<Long> productIds, int quantity, int customerId, Date orderDate, Status status) {
}
