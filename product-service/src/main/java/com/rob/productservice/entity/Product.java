package com.rob.productservice.entity;

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
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;
}
