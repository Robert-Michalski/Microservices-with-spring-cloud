package com.rob.productservice.service;

import com.rob.productservice.entity.ProductDetails;
import com.rob.productservice.repository.ProductDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductDetailsService {
    private final ProductDetailsRepository productDetailsRepository;

    public Long addProductDetails(ProductDetails productDetails){
       return productDetailsRepository.save(productDetails).getId();
    }
}
