package com.rob.orderservice.repository;

import com.rob.orderservice.dto.CartItemResponse;
import com.rob.orderservice.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Set<Order> findByCustomerId(int customerId);

    @Query(
            value = "SELECT product.name, order_details.quantity, product.price, " +
                    " order_id AS order_id FROM product" +
                    " JOIN order_details ON order_details.product_id=product.id" +
                    " JOIN t_order ON order_details.order_id=t_order.id" +
                    " JOIN user ON t_order.customer_id=user.id WHERE t_order.status=0 AND user.id=:customerId",
            nativeQuery = true
    )
    Set<String> getCartItemsByCustomerId(@Param("customerId") long customerId);

}
