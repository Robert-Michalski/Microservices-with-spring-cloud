package rob.notificationservice.model.dto;

import lombok.Builder;
import rob.notificationservice.model.entity.NotificationType;

import java.time.LocalDateTime;

@Builder
public record NotificationResponse(long id, String content, LocalDateTime timestamp, boolean isRead, NotificationType type) {
}
