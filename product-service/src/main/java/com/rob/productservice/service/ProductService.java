package com.rob.productservice.service;

import com.rob.productservice.dto.ProductRequest;
import com.rob.productservice.dto.ProductResponse;
import com.rob.productservice.entity.Product;
import com.rob.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductResponse addProduct(ProductRequest productRequest) {
        Product productToSave = Product.builder()
                .name(productRequest.name())
                .category(productRequest.category())
                .price(productRequest.price())
                .details(productRequest.details())
                .quantity(productRequest.quantity())
                .build();
        return ProductUtil.toDto(productRepository.save(productToSave));
    }

    public ProductResponse getProductById(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if(optionalProduct.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return ProductUtil.toDto(optionalProduct.get());
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductUtil::toDto)
                .toList();
    }

    public ProductResponse updateProductById(Long id, ProductRequest productRequest) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if(optionalProduct.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Product productToUpdate = optionalProduct.get();
        productToUpdate.setName(productRequest.name());
        productToUpdate.setCategory(productRequest.category());
        productToUpdate.setPrice(productRequest.price());
        productToUpdate.setDetails(productRequest.details());
        productToUpdate.setQuantity(productRequest.quantity());
        return ProductUtil.toDto(productRepository.save(productToUpdate));
    }

    public String deleteProductById(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if(optionalProduct.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        productRepository.deleteById(id);
        return "Product id: " + id + " deleted succesfully";
    }
}
