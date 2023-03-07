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
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.*;
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
        log.info("Request: {}", orderRequest);

        Long orderId = orderRepository.findOrdersByUserId(orderRequest.customerId()).orElseGet(() -> 0L);
        if (orderId == 0) {
            log.info("New order will be handled");
            Order order = orderRepository.save(Order.builder()
                    .orderDetails(new HashSet<>())
                    .orderDate(Date.from(Instant.now()))
                    .customerId(orderRequest.customerId())
                    .status(Status.CART).build());

            OrderDetails orderDetails = OrderDetails.builder()
                    .productId(orderRequest.productId())
                    .order(order)
                    .quantity(orderRequest.quantity()).build();

            OrderDetails savedOrderDetails = orderDetailsRepository.save(orderDetails);
            order.getOrderDetails().add(savedOrderDetails);
            orderRepository.save(order);
            log.info("Saved order: {}", orderRepository.findById(order.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST)));

            return OrderUtil.toDto(orderRepository.findById(order.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST)));

        } else {
            Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
            log.info("Already existing order will be handled {}", order);

            OrderDetails orderDetails = OrderDetails.builder()
                    .productId(orderRequest.productId())
                    .order(order)
                    .quantity(orderRequest.quantity()).build();

            if (order.getOrderDetails().stream().anyMatch(oDetails -> oDetails.getProductId() == orderDetails.getProductId())) {
                Iterator<OrderDetails> iterator = order.getOrderDetails().iterator();
                while (iterator.hasNext()) {
                    OrderDetails orderDetailsToCheck = iterator.next();
                    if (orderDetailsToCheck.getProductId() == orderRequest.productId()) {
                        log.info("There are two same products, increasing quantity");
                        OrderDetails orderDetails1 = orderDetailsRepository.findById(orderDetailsToCheck.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
                        log.info("Item before increasing quantity: {}", orderDetails1);
                        int totalQuantity = orderDetails1.getQuantity() + orderRequest.quantity();
                        orderDetailsRepository.setQuantityByIdAndUpdate(orderDetails1.getId(), totalQuantity);
                        orderDetails1.setQuantity(totalQuantity);
                        log.info("Item after increasing quantity: {}", orderDetailsRepository.findById(orderDetails1.getId()).get());
                    }
                }
            } else {
                OrderDetails savedOrderDetails = orderDetailsRepository.save(orderDetails);
                order.getOrderDetails().add(savedOrderDetails);
            }
            Order savedOrder = orderRepository.save(order);
            log.info("Saved order: {}", savedOrder);
            return OrderUtil.toDto(savedOrder);
        }
    }

    public Set<CartItemResponse> showCartItems(Long customerId) {
        Set<CartItemResponse> cartItemResponses = new HashSet<>();
        orderRepository.getCartItemsByCustomerId(customerId).forEach(c -> {
            String[] values = c.split(Pattern.quote(","));

            CartItemResponse cartItemResponse = CartItemResponse.builder()
                    .productName(values[0])
                    .quantity(Integer.parseInt(values[1]))
                    .price(Double.parseDouble(values[2]))
                    .orderId(Long.parseLong(values[3]))
                    .productId(Long.parseLong(values[4]))
                    .build();
            cartItemResponses.add(cartItemResponse);
        });
        return cartItemResponses;
    }

    public OrderResponse updateOrderStatus(OrderUpdateStatusRequest request, String token) {
        Order orderToUpdate = orderRepository.findById(request.orderId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        log.info("Updating status of order {}", orderToUpdate);
        if (checkIfProductsAreAvailableAndDecreaseTheirQuantity(orderToUpdate.getOrderDetails(), token)) {
            orderToUpdate.setStatus(request.status());
            orderToUpdate.setAddressId(request.addressId());
            Order savedOrder = orderRepository.save(orderToUpdate);
            log.info("Order after updating status {}", savedOrder);


            return OrderUtil.toDto(savedOrder);
        } else {
            log.info("Not enough product in stock");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

    }

    private boolean checkIfProductsAreAvailableAndDecreaseTheirQuantity(Set<OrderDetails> orderRequests, String token) {
        Map<Long, Integer> productsIdsToQuantity = new HashMap<>();
        orderRequests.forEach(product -> {
            log.info("Checking for availability of product id: {} quantity: {}", product.getProductId(), product.getQuantity());
            productsIdsToQuantity.put(product.getProductId(), product.getQuantity());
        });
        log.info("Map to send: {}", productsIdsToQuantity);
        Boolean result = webClient.post()
                .uri("http://localhost:8011/api/product/are-in-stock")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .bodyValue(productsIdsToQuantity)
                .retrieve()
                .bodyToMono(Boolean.class)
                .block();
        log.info("Result: {}", result);
        return result;
    }

    public String deleteOrderById(long id) {
        log.info("Deleting order id: {}", id);
        if (orderRepository.findById(id).isPresent()) {
            orderRepository.deleteById(id);
            log.info("Order with id: {} is present, deleting", id);
            return "Delete success";
        } else {
            log.info("Order with id: {} is not present", id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cant delete order id: " + id);
        }
    }

    public String deleteProductFromOrder(long orderId, long productId, Integer amountToDelete) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        OrderDetails orderDetails = orderDetailsRepository.findByOrder_IdAndProductId(orderId, productId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        boolean deleteSuccesfull = false;
        // if just decreasing amount
        if(orderDetails.getQuantity() > amountToDelete){
            log.info("Decreasing amount from {} to {}", orderDetails.getQuantity(), orderDetails.getQuantity()-amountToDelete);
            orderDetails.setQuantity(orderDetails.getQuantity()-amountToDelete);
            orderDetailsRepository.save(orderDetails);
            deleteSuccesfull = true;
        }
        // if deleting whole order
        else {
            log.info("Deleting whole order");
            long recordsDeleted = orderDetailsRepository.deleteByOrderIdAndProductId(order.getId(), productId);
            log.info("Deleting productId: {}, deleted {} records", productId, recordsDeleted);
            if(recordsDeleted > 0 ){
                deleteSuccesfull=true;
            }
        }

        if (deleteSuccesfull) {
            return "Delete";
        } else {
            return "Something went wrong";
        }
    }

    public long getCountOfPendingOrders() {
        return orderRepository.findAll().stream()
                .filter(order -> order.getStatus() == Status.RECEIVED)
                .count();
    }
}

