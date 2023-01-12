package com.rob.paymentservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PaymentApi {

    @Value("${eureka.instance.instance-id}")
    private String instanceId;

    @GetMapping
    public String hello(){
        return "Hello from payment api: "+instanceId ;
    }
}
