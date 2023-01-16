package com.rob.orderservice.service;

import com.rob.orderservice.dto.OrderResponse;
import com.rob.orderservice.entity.Order;

public class OrderUtil {

    public static OrderResponse toEntity(Order order){
        return OrderResponse.builder()
                .id(order.getId())
                .productId(order.getProductId())
                .quantity(order.getQuantity())
                .customerId(order.getCustomerId())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .build();
    }
}
