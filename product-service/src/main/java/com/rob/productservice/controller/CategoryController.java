package com.rob.productservice.controller;

import com.rob.productservice.dto.CategoryResponse;
import com.rob.productservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("all")
    public List<CategoryResponse> getll(){
        return categoryService.getAll();
    }
}
