package com.rob.productservice.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    private Category category;
    private double price;
    private String details;
    private int quantity;
    @Nullable
    private Long imageId;

    @ManyToOne
    @JoinColumn(name = "product_details_id")
    private ProductDetails productDetails;

}
