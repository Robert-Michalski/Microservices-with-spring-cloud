package rob.notificationservice.service;

import rob.notificationservice.model.dto.NotificationRequest;
import rob.notificationservice.model.dto.NotificationResponse;
import rob.notificationservice.model.entity.Notification;

import java.time.LocalDateTime;

public class NotificationMapper {

    public static Notification toEntity(NotificationRequest notificationRequest){
        return Notification.builder()
                .recipientId(notificationRequest.recipientId())
                .content(notificationRequest.content())
                .timestamp(LocalDateTime.now())
                .build();
    }
    public static NotificationResponse toDto(Notification notification){
        return NotificationResponse.builder()
                .content(notification.getContent())
                .timestamp(notification.getTimestamp())
                .isRead(notification.isRead())
                .build();
    }
}
