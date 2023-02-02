package com.rob.productservice.service;

import com.rob.productservice.dto.ProductRequest;
import com.rob.productservice.dto.ProductRequestNew;
import com.rob.productservice.dto.ProductResponse;
import com.rob.productservice.entity.Category;
import com.rob.productservice.entity.Product;
import com.rob.productservice.repository.CategoryRepository;
import com.rob.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
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

//    public boolean isInStock(ProductOrder productOrder) {
//        Product productToCheck = productRepository.findById(productOrder.()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
//        boolean result = productToCheck.getQuantity() >= productOrder.quantity();
//        if (result) {
//            decreaseQuantity(productOrder.productId(), productOrder.quantity());
//        }
//        return result;
//    }

//    public boolean areInStock(Set<ProductOrder> productOrders) {
//        return productOrders.stream().allMatch(this::isInStock);
//    }

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

    public boolean areInStockNew(ProductRequestNew productRequestNew) {
        log.info("INSIDE ProductService/areInStockNew START");
        log.info("REQUEST: {}", productRequestNew);
        productRequestNew.productIdsToQuantity().keySet().forEach(productId -> {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> {
                        log.info("Product with id: {} doesn't exist", productId);
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
                    });
            log.info("{} amount of {} was requested", product.getName(), productRequestNew.productIdsToQuantity().get(productId));
            if (product.getQuantity() < productRequestNew.productIdsToQuantity().get(productId)) {
                log.info("{} has {} quantity but {} was requested",
                        product.getName(), product.getQuantity(), productRequestNew.productIdsToQuantity().get(productId));
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }
            decreaseQuantity(productId, productRequestNew.productIdsToQuantity().get(productId));
        });
        log.info("INSIDE ProductService/areInStockNew END");
        return true;
    }
}
