package com.rob.orderservice.repository;

import com.rob.orderservice.entity.OrderDetails;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
    value = "UPDATE order_details SET quantity = :amount WHERE id=:orderDetailsId")
    int setQuantityByIdAndUpdate(@Param("orderDetailsId")long orderDetailsId, @Param(("amount")) int amount);

    @Transactional
    @Modifying
    long deleteByOrderIdAndProductId(long orderId, long productId);


}
