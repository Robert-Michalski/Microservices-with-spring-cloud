package com.rob.productservice.repository;

import com.rob.productservice.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory_NameIgnoreCase(String name, Pageable pageable);
}
