package com.rob.orderservice.service;

import com.rob.orderservice.dto.DetailedOrderResponse;
import com.rob.orderservice.dto.OrderRequest;
import com.rob.orderservice.dto.OrderResponse;
import com.rob.orderservice.entity.Order;
import com.rob.orderservice.entity.Status;
import com.rob.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.TemporalAccessor;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final WebClient webClient;

    public OrderResponse saveOrder(OrderRequest orderRequest) {
        Order orderToSave = Order.builder()
                .productId(orderRequest.productId())
                .quantity(orderRequest.quantity())
                .customerId(orderRequest.customerId())
                .orderDate(Date.from(Instant.now()))
                .status(Status.RECEIVED)
                .build();
        Boolean result = webClient.post()
                .uri("http://localhost:8011/api/product/is-in-stock")
                .bodyValue(orderRequest)
                .retrieve()
                .bodyToMono(Boolean.class)
                .block();
        if(result) {
            return OrderUtil.toDto(orderRepository.save(orderToSave));
        }
        else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "SOMETHING WRONG DURING ORDER PLACEMENT");
        }
    }

    public Set<OrderResponse> saveOrder(Set<OrderRequest> orderRequests) {
        Set<OrderResponse> setToReturn = new HashSet<>();
        Boolean result = webClient.post()
                .uri("http://localhost:8011/api/product/are-in-stock")
                .bodyValue(orderRequests)
                .retrieve()
                .bodyToMono(Boolean.class)
                .block();
        if(result){
           orderRequests.forEach(orderRequest -> {
               Order save = orderRepository.save(OrderUtil.toEntity(orderRequest));
               save.setOrderDate(Date.from(Instant.now()));
               save.setStatus(Status.RECEIVED);
               setToReturn.add(OrderUtil.toDto(save));
           });
        }
        else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Something went wrong during order placement");
        }
        return setToReturn;
    }

    public List<DetailedOrderResponse> getOrdersOfUser(int id){

        return orderRepository.findByCustomerId(id)
                .stream()
                .map(this::toDetailedDto)
                .toList();
    }
    private String getProductName(int id){
        String productName = webClient.get()
                .uri("http://localhost:8011/api/product/"+id+"/name")
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return productName;
    }

    private DetailedOrderResponse toDetailedDto(Order order){
        return DetailedOrderResponse.builder()
                .id(order.getId())
                .productName(getProductName(order.getProductId()))
                .quantity(order.getQuantity())
                .customerId(order.getCustomerId())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .build();
    }
}
