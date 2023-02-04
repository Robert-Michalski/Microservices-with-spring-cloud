package com.rob.orderservice.dto;

import com.rob.orderservice.entity.OrderDetails;
import com.rob.orderservice.entity.Status;
import lombok.Builder;

import java.util.Date;
import java.util.Set;

@Builder
public record OrderResponse(Long id, Set<OrderDetails> orderDetails, long customerId, Date orderDate, Status status, long addressId) {
}
