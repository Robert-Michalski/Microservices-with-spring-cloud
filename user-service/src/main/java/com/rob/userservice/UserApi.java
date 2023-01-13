package com.rob.userservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user-api")
public class UserApi {
    @Value("${app.user}")
    private String appUser;
    @GetMapping
    public String hello(){
        return "Hello from user api its "+appUser;
    }
}
