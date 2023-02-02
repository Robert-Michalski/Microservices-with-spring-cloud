package com.rob.orderservice.service;

import com.rob.orderservice.dto.OrderResponse;
import com.rob.orderservice.entity.Order;

public class OrderUtil {

    public static OrderResponse toDto(Order order){
        return OrderResponse.builder()
                .id(order.getId())
                .orderDetails(order.getOrderDetails())
                .customerId(order.getCustomerId())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .build();
    }
}
