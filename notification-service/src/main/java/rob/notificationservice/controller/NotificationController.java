package rob.notificationservice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import rob.notificationservice.model.dto.NotificationRequest;
import rob.notificationservice.model.dto.NotificationResponse;
import rob.notificationservice.service.NotificationService;

import java.time.LocalDateTime;

@RestController
@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@Slf4j
public class NotificationController {
    private final NotificationService notificationService;

    @PostMapping("/send")
    @ResponseStatus(HttpStatus.CREATED)
    public NotificationResponse sendMessage(@RequestBody NotificationRequest request){
        return notificationService.sendAndSaveNotification(request);
    }

}
