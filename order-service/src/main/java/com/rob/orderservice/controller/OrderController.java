package com.rob.orderservice.controller;

import com.rob.orderservice.dto.*;
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
    public OrderResponse saveOrder(@RequestBody @Validated OrderRequest orderRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
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

    @GetMapping("/pendingCount")
    public long getCountOfPendingOrders() {
        return orderService.getCountOfPendingOrders();
    }

    @GetMapping("cart/{customerId}")
    public Set<CartItemResponse> showCartItems(@PathVariable Long customerId) {
        return orderService.showCartItems(customerId);
    }

    @PatchMapping("status")
    public OrderResponse updateOrderStatus(@RequestBody OrderUpdateStatusRequest request, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return orderService.updateOrderStatus(request, token);
    }
    @DeleteMapping("{id}")
    public String deleteOrder(@PathVariable long id) {
        return orderService.deleteOrderById(id);
    }

    @DeleteMapping("{orderId}/product")
    public String deleteProductFromOrder(@PathVariable long orderId, @RequestParam long productId, @RequestParam(required = false) Integer amountToDelete) {
        return orderService.deleteProductFromOrder(orderId, productId, amountToDelete);
    }

    @GetMapping("pending")
    public Set<OrderDetailed> getPendingOrders(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return orderService.getPendingOrders(token);
    }

    @GetMapping("{orderId}")
    public OrderDetailed getSingleOrderDetailed(@PathVariable long orderId, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        return orderService.getSingleOrderDetailedById(orderId, token);
    }
}
