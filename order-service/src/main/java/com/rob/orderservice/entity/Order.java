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
@ToString
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(cascade = CascadeType.MERGE)
    @JoinColumn(name="orderId")
    private Set<OrderDetails> orderDetails;
    private long customerId;
    private Date orderDate;
    private Status status;


}
