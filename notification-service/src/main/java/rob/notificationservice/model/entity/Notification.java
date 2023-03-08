package rob.notificationservice.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long recipientId;
    private String content;
    private LocalDateTime timestamp;
    private boolean isRead;
    @Enumerated(EnumType.STRING)
    private NotificationType type;
}
