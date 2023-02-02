package com.rob.orderservice.controller;

import com.rob.orderservice.dto.NewOrderRequest;
import com.rob.orderservice.dto.NewOrderResponse;
import com.rob.orderservice.dto.OrderRequest;
import com.rob.orderservice.dto.OrderResponse;
import com.rob.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse saveOrder(@RequestBody @Validated OrderRequest orderRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return orderService.saveOrder(orderRequest, token);
    }
    @PostMapping("multiple")
    @ResponseStatus(HttpStatus.CREATED)
    public Set<OrderResponse> saveOrder(@RequestBody Set<OrderRequest> orderRequests, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return orderService.saveOrder(orderRequests, token);
    }

    @GetMapping("/user/{id}")
    public List<OrderResponse> getOrdersOfUser(@PathVariable int id){
        return orderService.getOrdersOfUser(id);
    }
    @GetMapping("/count-all")
    public Long countAll(){
        return orderService.countAll();
    }


    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public NewOrderResponse saveOrderNew(@RequestBody @Validated NewOrderRequest orderRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return orderService.saveOrderNew(orderRequest, token);
    }
}
