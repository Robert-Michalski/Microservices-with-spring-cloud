package com.rob.productservice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netflix.discovery.converters.Auto;
import com.rob.productservice.dto.ProductRequest;
import com.rob.productservice.entity.Product;
import com.rob.productservice.repository.ProductRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@Testcontainers
@AutoConfigureMockMvc
class ProductServiceApplicationTests{
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private ProductRepository productRepository;
    @Container
    static MySQLContainer mySQLContainer = new MySQLContainer("mysql");

    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry dynamicPropertyRegistry) {
        dynamicPropertyRegistry.add("spring.datasource.url", mySQLContainer::getJdbcUrl);
        dynamicPropertyRegistry.add("spring.datasource.password", mySQLContainer::getPassword);
    }

    @Test
    void contextLoads() {
    }

    @Test
    void shouldCreateProduct() throws Exception {
        ProductRequest productRequest = getProductRequest();
        String productRequestString = objectMapper.writeValueAsString(productRequest);
        int sizeBefore = productRepository.findAll().size();
        mockMvc.perform(MockMvcRequestBuilders.post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(productRequestString))
                .andExpect(MockMvcResultMatchers.status().isCreated());
        Assertions.assertEquals(sizeBefore+1,productRepository.findAll().size());

    }
    @Test
    void shouldUpdateProduct() throws Exception {
        ProductRequest productRequest = getProductRequest();
        String productRequestString = objectMapper.writeValueAsString(productRequest);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/product/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(productRequestString))
                .andExpect(MockMvcResultMatchers.status().isOk());
        Product product = productRepository.findById(1L).get();
        Assertions.assertAll(() -> {
            Assertions.assertEquals(1, product.getId());
            Assertions.assertEquals(1200, product.getPrice());
            Assertions.assertEquals("Product 1", product.getName());
        });
    }

    @Test
    void shouldDeleteProduct() throws Exception {
        int sizeBefore = productRepository.findAll().size();
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/product/{id}", 2)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
        Assertions.assertEquals(sizeBefore-1, productRepository.findAll().size());
    }
    private ProductRequest getProductRequest() {
        return ProductRequest.builder()
                .name("Product 1")
                .price(1200)
                .details("No details")
                .categoryId(1)
                .quantity(1)
                .build();
    }

}
