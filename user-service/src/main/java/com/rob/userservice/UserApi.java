package com.rob.userservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user-api")
public class UserApi {

    @GetMapping
    public String hello(){
        return "Hello from user api";
    }
}
