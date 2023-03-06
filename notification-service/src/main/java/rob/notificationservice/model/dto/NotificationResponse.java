package rob.notificationservice.model.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record NotificationResponse(String content, LocalDateTime timestamp, boolean isRead) {
}
