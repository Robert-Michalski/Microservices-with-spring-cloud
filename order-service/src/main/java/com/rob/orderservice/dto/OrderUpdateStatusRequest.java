package com.rob.orderservice.dto;

import com.rob.orderservice.entity.Status;

public record OrderUpdateStatusRequest(long orderId, long addressId, Status status) {
}
