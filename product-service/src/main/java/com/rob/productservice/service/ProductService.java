package com.rob.productservice.service;

import com.rob.productservice.dto.ProductOrder;
import com.rob.productservice.dto.ProductRequest;
import com.rob.productservice.dto.ProductResponse;
import com.rob.productservice.entity.Category;
import com.rob.productservice.entity.Product;
import com.rob.productservice.repository.CategoryRepository;
import com.rob.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductResponse addProduct(ProductRequest productRequest) {
        if (categoryRepository.findById(productRequest.categoryId()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Category category = categoryRepository.findById(productRequest.categoryId()).get();
        Product productToSave = Product.builder()
                .name(productRequest.name())
                .category(category)
                .price(productRequest.price())
                .details(productRequest.details())
                .quantity(productRequest.quantity())
                .build();
        return ProductUtil.toDto(productRepository.save(productToSave));
    }

    public ProductResponse getProductById(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
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
        if (optionalProduct.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (categoryRepository.findById(productRequest.categoryId()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Category category = categoryRepository.findById(productRequest.categoryId()).get();
        Product productToUpdate = optionalProduct.get();
        productToUpdate.setName(productRequest.name());
        productToUpdate.setCategory(category);
        productToUpdate.setPrice(productRequest.price());
        productToUpdate.setDetails(productRequest.details());
        productToUpdate.setQuantity(productRequest.quantity());
        return ProductUtil.toDto(productRepository.save(productToUpdate));
    }

    public String deleteProductById(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        productRepository.deleteById(id);
        return "Product id: " + id + " deleted successfully";
    }

    public boolean isInStock(ProductOrder productOrder) {
        if (productRepository.findById(productOrder.productId()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Product productToCheck = productRepository.findById(productOrder.productId()).get();
        boolean result = productToCheck.getQuantity() >= productOrder.quantity();
        if(result) {
            decreaseQuantity(productOrder.productId(), productOrder.quantity());
        }
        return result;
    }

    public boolean areInStock(Set<ProductOrder> productOrders) {
       return productOrders.stream().allMatch(this::isInStock);
    }

    public ProductResponse decreaseQuantity(Long id, int amount) {
        Optional<Product> byId = productRepository.findById(id);
        if(byId.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Product product = byId.get();
        product.setQuantity(product.getQuantity()-amount);
        return ProductUtil.toDto(productRepository.save(product));
    }

    public String getNameOfProduct(Long id) {
        if(productRepository.findById(id).get()!=null) {
            return productRepository.findById(id).get().getName();
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    public long countAll() {
        return productRepository.count();
    }
}
