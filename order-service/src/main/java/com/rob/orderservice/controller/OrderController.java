package com.rob.orderservice.controller;

import com.rob.orderservice.dto.OrderRequest;
import com.rob.orderservice.dto.OrderResponse;
import com.rob.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse saveOrderNew(@RequestBody @Validated OrderRequest orderRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return orderService.saveOrder(orderRequest, token);
    }

    @GetMapping("/user/{id}")
    public List<OrderResponse> getOrdersOfUser(@PathVariable int id) {
        return orderService.getOrdersOfUser(id);
    }

    @GetMapping("/count-all")
    public Long countAll() {
        return orderService.countAll();
    }


}
