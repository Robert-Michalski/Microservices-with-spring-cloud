package com.rob.productservice.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ProductDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nullable
    private Float displayInInches;
    private String processorName;
    private Integer ram;
    private Integer storageInGb;
    private Integer mainCameraInMpx;
    private String memoryType;
    private Integer memoryInGb;
    private String connectors;
    private Float clockSpeedInMHz;
    private String socket;
    private Integer cores;
    private Integer cacheInMb;
    private String backlight;
    private String destination;
    private String switches;
    private String connectivity;
    private String color;

}
