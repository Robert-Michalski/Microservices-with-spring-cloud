package com.rob.orderservice.service;

import com.rob.orderservice.dto.CartItemResponse;
import com.rob.orderservice.dto.OrderRequest;
import com.rob.orderservice.dto.OrderResponse;
import com.rob.orderservice.dto.OrderUpdateStatusRequest;
import com.rob.orderservice.entity.Order;
import com.rob.orderservice.entity.OrderDetails;
import com.rob.orderservice.entity.Status;
import com.rob.orderservice.repository.OrderDetailsRepository;
import com.rob.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final WebClient webClient;
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    public List<OrderResponse> getOrdersOfUser(int id) {
        return orderRepository.findByCustomerId(id)
                .stream()
                .map(OrderUtil::toDto)
                .toList();
    }

    public Long countAll() {
        return orderRepository.count();
    }

    public OrderResponse saveOrder(OrderRequest orderRequest, String token) {
//        Boolean response = webClient.post()
//                .uri("http://localhost:8011/api/product/are-in-stock")
//                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
//                .bodyValue(orderRequest)
//                .retrieve()
//                .bodyToMono(Boolean.class)
//                .block();
//        if (response) {
        Order order = orderRepository.save(Order.builder()
                .orderDetails(new HashSet<>())
                .orderDate(Date.from(Instant.now()))
                .customerId(orderRequest.customerId())
                .status(Status.CART).build());

        orderRequest.productIdsToQuantity().keySet().forEach(productId -> {
            OrderDetails orderDetailsToSave = orderDetailsRepository.save(OrderDetails.builder().productId(productId).quantity(orderRequest.productIdsToQuantity().get(productId))
                    .orderId(order.getId()).build());
            order.getOrderDetails().add(orderDetailsToSave);
            orderRepository.save(order);

            log.info("Saved orderDetails: {}", orderDetailsToSave);
        });

        log.info("Saved order: {}", orderRepository.findById(order.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST)));

        return OrderUtil.toDto(orderRepository.findById(order.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST)));

    }

    public Set<CartItemResponse> showCartItems(Long customerId) {
        Set<CartItemResponse> cartItemResponses = new HashSet<>();
        orderRepository.getCartItemsByCustomerId(customerId).forEach(c -> {
            String[] values = c.split(Pattern.quote(","));
            CartItemResponse cartItemResponse = CartItemResponse.builder()
                    .productName(values[0])
                    .quantity(Integer.valueOf(values[1]))
                    .price(Double.valueOf(values[2]))
                    .orderId(Long.valueOf(values[3]))
                    .build();
            cartItemResponses.add(cartItemResponse);
        });
        return cartItemResponses;
    }

    public OrderResponse updateOrderStatus(OrderUpdateStatusRequest request) {
        Order orderToUpdate = orderRepository.findById(request.orderId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        orderToUpdate.setStatus(request.status());
        orderToUpdate.setAddressId(request.addressId());
        return OrderUtil.toDto(orderRepository.save(orderToUpdate));
    }
}

