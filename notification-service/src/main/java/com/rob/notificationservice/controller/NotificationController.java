package com.rob.notificationservice.controller;

import com.rob.notificationservice.dto.Notification;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000")
public class NotificationController {

    @MessageMapping("/api/notification")
    @SendTo("/notification/message")
    public String get(Notification notification){
        return Notification.builder().value(notification.value() + " from GUI !").build().value();
    }
}
