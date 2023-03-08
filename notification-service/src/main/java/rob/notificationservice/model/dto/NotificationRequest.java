package rob.notificationservice.model.dto;

import rob.notificationservice.model.entity.NotificationType;

public record NotificationRequest(String content, long recipientId, NotificationType type) {
}
