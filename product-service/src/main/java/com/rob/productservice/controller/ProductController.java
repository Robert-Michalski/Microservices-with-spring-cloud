package com.rob.productservice.controller;

import com.rob.productservice.dto.*;
import com.rob.productservice.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse addProduct(@RequestBody ProductRequest productRequest, @RequestParam("image")MultipartFile file) throws IOException {
        return productService.addProduct(productRequest, file);
    }

    @GetMapping("{id}")
    public ProductResponse getProductById(@PathVariable Long id){
        return productService.getProductById(id);
    }

    @GetMapping("{id}/short")
    public ProductResponseShort getShortProductById(@PathVariable Long id){
        return productService.getShortProductById(id);
    }

    @GetMapping("all")
    public List<ProductResponse> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping()
    public List<ProductResponse> getProductsByCategoryPageable(@RequestParam String category, @RequestParam int page, @RequestParam(required = false) String sortBy, @RequestParam(required = false) String order){
        return productService.getProductsByCategory(category, page, sortBy, order);
    }

    @Transactional
    @PutMapping("{id}")
    public ProductResponse updateProductById(@PathVariable Long id, @RequestBody ProductRequest productRequest){
        return productService.updateProductById(id, productRequest);
    }
    @Transactional
    @DeleteMapping("{id}")
    public String deleteProductById(@PathVariable Long id){
        return productService.deleteProductById(id);
    }

    @PatchMapping("{id}")
    public ProductResponse decreaseQuantity(@PathVariable Long id, @RequestParam int amount){
        return productService.decreaseQuantity(id, amount);
    }

    @GetMapping("{id}/name")
    public String getNameOfProduct(@PathVariable Long id){
        return productService.getNameOfProduct(id);
    }

    @GetMapping("/count-all")
    public long countProducts(){
        return productService.countAll();
    }

    @PostMapping("/are-in-stock")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean areInStock(@RequestBody Map<Long, Integer> productIdsToQuantity){
        return productService.areInStock(productIdsToQuantity);
    }
    @PostMapping("is-in-stock")
    public boolean isInStock(@RequestBody ProductStockRequest request){
        return productService.isInStock(request);
    }

    @GetMapping("/search")
    public List<ProductResponse> search(@RequestParam String name){
        return productService.search(name);
    }
}
