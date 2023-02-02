package com.rob.orderservice.dto;

import com.rob.orderservice.entity.Status;

import java.util.Date;
import java.util.Set;

public record NewOrderResponse(Long id, Set<Integer> productIds, int quantity, int customerId, Date orderDate, Status status) {
}
