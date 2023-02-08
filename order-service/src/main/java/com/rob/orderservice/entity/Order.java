package com.rob.orderservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "t_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(mappedBy = "order")
    private Set<OrderDetails> orderDetails;
    private long customerId;
    private long addressId;
    private Date orderDate;
    @Enumerated(EnumType.STRING)
    private Status status;


    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", customerId=" + customerId +
                ", addressId=" + addressId +
                ", orderDate=" + orderDate +
                ", status=" + status +
                '}';
    }
}
