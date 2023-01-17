package com.rob.orderservice.controller;

import com.rob.orderservice.dto.DetailedOrderResponse;
import com.rob.orderservice.dto.OrderRequest;
import com.rob.orderservice.dto.OrderResponse;
import com.rob.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public OrderResponse saveOrder(@RequestBody OrderRequest orderRequest){
        return orderService.saveOrder(orderRequest);
    }
    @PostMapping("multiple")
    public Set<OrderResponse> saveOrder(@RequestBody Set<OrderRequest> orderRequests){
        return orderService.saveOrder(orderRequests);
    }

    @GetMapping("/user/{id}")
    public List<DetailedOrderResponse> getOrdersOfUser(@PathVariable int id){
        return orderService.getOrdersOfUser(id);
    }
}
