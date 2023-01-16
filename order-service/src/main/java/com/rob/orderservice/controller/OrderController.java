package com.rob.orderservice.controller;

import com.rob.orderservice.dto.OrderRequest;
import com.rob.orderservice.dto.OrderResponse;
import com.rob.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public OrderResponse saveOrder(@RequestBody OrderRequest orderRequest){
        return orderService.saveOrder(orderRequest);
    }
}
