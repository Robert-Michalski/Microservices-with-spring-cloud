package com.rob.productservice.service;

import com.rob.productservice.dto.ProductRequest;
import com.rob.productservice.dto.ProductResponse;
import com.rob.productservice.dto.ProductResponseShort;
import com.rob.productservice.dto.ProductStockRequest;
import com.rob.productservice.entity.Category;
import com.rob.productservice.entity.Product;
import com.rob.productservice.repository.CategoryRepository;
import com.rob.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    private static final Logger log = LoggerFactory.getLogger(ProductService.class);

    public ProductResponse addProduct(ProductRequest productRequest) {
        if (categoryRepository.findById(productRequest.categoryId()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Category category = categoryRepository.findById(productRequest.categoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
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
        Product product = productRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        return ProductUtil.toDto(product);
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductUtil::toDto)
                .toList();
    }

    public ProductResponse updateProductById(Long id, ProductRequest productRequest) {
        Category category = categoryRepository.findById(productRequest.categoryId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        Product productToUpdate = productRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

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

    public ProductResponse decreaseQuantity(Long id, int amount) {
        Optional<Product> byId = productRepository.findById(id);
        if (byId.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Product product = byId.get();
        product.setQuantity(product.getQuantity() - amount);
        return ProductUtil.toDto(productRepository.save(product));
    }

    public String getNameOfProduct(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST)).getName();
    }

    public long countAll() {
        return productRepository.count();
    }

    public boolean areInStock(Map<Long, Integer> productIdsToQuantity) {
        log.info("Request: {}", productIdsToQuantity);
        productIdsToQuantity.forEach((productId, quantity)-> {
            Product product = productRepository.findById(productId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
            if(product.getQuantity()<quantity){
                log.info("{} has {} available amount but {} was requested",
                        product.getName(), product.getQuantity(), quantity);
                throw  new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not enough stock for this product");
            }
            decreaseQuantity(productId, quantity);
        });
        return true;
    }

    public boolean isInStock(ProductStockRequest request) {
        log.info("Request: {}", request);
        Product product = productRepository.findById(request.productId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        if(product.getQuantity()< request.quantity()){
            log.info("{} has {} available amount but {} was requested",
                    product.getName(), product.getQuantity(), request.quantity());
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not enough stock for this product");
        }
        decreaseQuantity(request.productId(), request.quantity());
        return true;
    }

    public List<ProductResponse> getProductsByCategory(String category, int page, String sortBy, String order) {

        if(sortBy == null){
            sortBy = "name";
        }
        if(order == null){
            order="ascending";
        }

        Sort sort = Sort.by(sortBy).ascending();

        if(order.equals("descending")){
            sort = Sort.by(sortBy).descending();
        }

        log.info("order is {}", order);

        Pageable pageable = PageRequest.of(page, 8, sort);
        return productRepository.findByCategory_NameIgnoreCase(category, pageable)
                .stream()
                .map(ProductUtil::toDto)
                .toList();
    }

    public List<ProductResponse> search(String name) {
        return productRepository.findByNameContainsIgnoreCase(name)
                .stream()
                .map(ProductUtil::toDto)
                .toList();
    }

    public ProductResponseShort getShortProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        return ProductUtil.toShortDto(product);
    }
}
