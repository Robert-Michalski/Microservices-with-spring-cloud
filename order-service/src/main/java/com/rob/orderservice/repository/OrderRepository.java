package com.rob.orderservice.repository;

import com.rob.orderservice.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Set<Order> findByCustomerId(int customerId);

}
