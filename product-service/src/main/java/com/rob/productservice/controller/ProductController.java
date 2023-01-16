package com.rob.productservice.controller;

import com.rob.productservice.dto.ProductOrder;
import com.rob.productservice.dto.ProductRequest;
import com.rob.productservice.dto.ProductResponse;
import com.rob.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ProductResponse addProduct(@RequestBody ProductRequest productRequest){
        return productService.addProduct(productRequest);
    }

    @GetMapping("{id}")
    public ProductResponse getProductById(@PathVariable Long id){
        return productService.getProductById(id);
    }

    @GetMapping("all")
    public List<ProductResponse> getAllProducts(){
        return productService.getAllProducts();
    }

    @PutMapping("{id}")
    public ProductResponse updateProductById(@PathVariable Long id, @RequestBody ProductRequest productRequest){
        return productService.updateProductById(id, productRequest);
    }

    @DeleteMapping("{id}")
    public String deleteProductById(@PathVariable Long id){
        return productService.deleteProductById(id);
    }

    @PostMapping("is-in-stock")
    public boolean isInStock(@RequestBody ProductOrder productOrder){
        return productService.isInStock(productOrder);
    }

    @PostMapping("are-in-stock")
    public boolean areInStock(@RequestBody Set<ProductOrder> productOrders){
        return productService.areInStock(productOrders);
    }
}
