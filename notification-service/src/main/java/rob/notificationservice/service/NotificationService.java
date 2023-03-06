package rob.notificationservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import rob.notificationservice.model.dto.NotificationRequest;
import rob.notificationservice.model.dto.NotificationResponse;
import rob.notificationservice.model.entity.Notification;
import rob.notificationservice.repository.NotificationRepository;

import java.util.List;

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


    public List<NotificationResponse> getAllNotificationsById(Long userId) {
        return notificationRepository.findByRecipientId(userId)
                .stream()
                .map(NotificationMapper::toDto)
                .toList();
    }

    public NotificationResponse markAsRead(long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "No notification with id: " + notificationId + " found"));
        notification.setRead(true);
        Notification savedNotification = notificationRepository.save(notification);
        return NotificationMapper.toDto(savedNotification);
    }
}
