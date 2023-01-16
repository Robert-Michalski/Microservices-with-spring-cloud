package com.rob.orderservice.service;

import com.rob.orderservice.dto.OrderRequest;
import com.rob.orderservice.dto.OrderResponse;
import com.rob.orderservice.entity.Order;

public class OrderUtil {

    public static OrderResponse toDto(Order order){
        return OrderResponse.builder()
                .id(order.getId())
                .productId(order.getProductId())
                .quantity(order.getQuantity())
                .customerId(order.getCustomerId())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .build();
    }
    public static Order toEntity(OrderRequest orderRequest){
        return Order.builder()
                .customerId(orderRequest.customerId())
                .productId(orderRequest.productId())
                .quantity(orderRequest.quantity())
                .build();
    }
}
