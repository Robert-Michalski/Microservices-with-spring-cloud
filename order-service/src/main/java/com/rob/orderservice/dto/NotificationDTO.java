package com.rob.orderservice.dto;

import lombok.Builder;

@Builder
public record NotificationDTO(String content, long recipientId) {
}
