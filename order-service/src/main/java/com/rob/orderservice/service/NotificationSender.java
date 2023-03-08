package com.rob.orderservice.service;

import com.rob.orderservice.dto.NotificationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class NotificationSender {
    private final WebClient webClient;

    public void send(NotificationDTO notificationDTO, String token) {
        webClient.post()
                .uri("http://localhost:9090/api/notification/send")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .bodyValue(notificationDTO)
                .retrieve()
                .bodyToMono(Boolean.class)
                .block();
    }
}
