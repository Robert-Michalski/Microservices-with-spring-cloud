package com.rob.orderservice.dto;

import com.rob.orderservice.entity.NotificationType;
import lombok.Builder;

@Builder
public record NotificationDTO(String content, long recipientId, NotificationType type) {
}
