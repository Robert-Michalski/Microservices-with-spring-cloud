package com.rob.productservice.controller;

import com.rob.productservice.entity.ProductDetails;
import com.rob.productservice.service.ProductDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/productDetails")
@RequiredArgsConstructor
public class ProductDetailsController {
    private final ProductDetailsService productDetailsService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long addProductDetails(@RequestBody ProductDetails productDetails) {
        return productDetailsService.addProductDetails(productDetails);
    }
}
