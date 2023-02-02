package com.rob.orderservice.service;

import com.rob.orderservice.dto.*;
import com.rob.orderservice.entity.Order;
import com.rob.orderservice.entity.OrderDetails;
import com.rob.orderservice.entity.Status;
import com.rob.orderservice.repository.OrderDetailsRepository;
import com.rob.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final WebClient webClient;
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

//    public List<OrderResponse> getOrdersOfUser(int id) {
//        return orderRepository.findByCustomerId(id)
//                .stream()
//                .map(OrderUtil::toDto)
//                .toList();
//    }

    public Long countAll() {
        return orderRepository.count();
    }

    public NewOrderResponse saveOrder(NewOrderRequest orderRequest, String token) {

        Order order = orderRepository.save(Order.builder()
                .orderDate(Date.from(Instant.now()))
                .customerId(orderRequest.customerId())
                .status(Status.RECEIVED).build());
        log.info("Saved order: {}", order);
        orderRequest.productIdsToQuantity().keySet().forEach(productId->{
            OrderDetails orderDetailsToSave = orderDetailsRepository.save(OrderDetails.builder().productId(productId).quantity(orderRequest.productIdsToQuantity().get(productId))
                    .orderId(order.getId()).build());
            log.info("Saved orderDetails: {}", orderDetailsToSave);
        });
        log.info("Response = {}", webClient.post()
                .uri("http://localhost:8011/api/product/are-in-stock")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .bodyValue(orderRequest)
                .retrieve()
                .bodyToMono(Boolean.class)
                .block());

        return null;
    }
}
