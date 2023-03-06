package rob.notificationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rob.notificationservice.model.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
