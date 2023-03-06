package rob.notificationservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import rob.notificationservice.model.dto.NotificationRequest;
import rob.notificationservice.model.dto.NotificationResponse;
import rob.notificationservice.model.entity.Notification;
import rob.notificationservice.repository.NotificationRepository;

@RequiredArgsConstructor
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate template;


    public NotificationResponse sendAndSaveNotification(NotificationRequest notificationRequest) {

        Notification notification = NotificationMapper.toEntity(notificationRequest);
        notification.setRead(false);

        Notification savedNotification = notificationRepository.save(notification);

        NotificationResponse response = NotificationMapper.toDto(savedNotification);

        template.convertAndSendToUser(String.valueOf(notificationRequest.recipientId()),
                "/queue/messages", response);

        return response;
    }
}
