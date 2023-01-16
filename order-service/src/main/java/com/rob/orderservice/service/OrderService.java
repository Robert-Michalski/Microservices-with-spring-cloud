package com.rob.orderservice.service;

import com.rob.orderservice.dto.OrderRequest;
import com.rob.orderservice.dto.OrderResponse;
import com.rob.orderservice.entity.Order;
import com.rob.orderservice.entity.Status;
import com.rob.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.TemporalAccessor;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderResponse saveOrder(OrderRequest orderRequest){
        Order orderToSave = Order.builder()
                .productId(orderRequest.productId())
                .quantity(orderRequest.quantity())
                .customerId(orderRequest.customerId())
                .orderDate(Date.from(Instant.now()))
                .status(Status.RECEIVED)
                .build();
        return OrderUtil.toEntity(orderRepository.save(orderToSave));
    }
}
