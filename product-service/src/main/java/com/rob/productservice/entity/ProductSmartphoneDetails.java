package com.rob.productservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity
public class ProductSmartphoneDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float displayInInches;
    private String processorName;
    private int ram;
    private int storage;
    private String color;
    private int cameraInMpx;

}
