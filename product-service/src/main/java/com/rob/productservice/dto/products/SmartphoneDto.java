package com.rob.productservice.dto.products;

public record SmartphoneDto(float displayInInches,
                            int ram,
                            int storage,
                            int mainCameraInMpx,
                            String color) {
}
