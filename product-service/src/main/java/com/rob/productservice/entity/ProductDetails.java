package com.rob.productservice.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity
public class ProductDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JoinColumn(name = "product_smartphone_details_id")
    @Nullable
    private ProductSmartphoneDetails productSmartphoneDetails;
}
