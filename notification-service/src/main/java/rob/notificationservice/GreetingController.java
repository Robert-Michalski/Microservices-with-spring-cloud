package rob.notificationservice;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@Slf4j
public class GreetingController {
    private final SimpMessagingTemplate template;

    @PostMapping("/send")
    public void sendMessage(@RequestBody HelloMessage helloMessage){
        template.convertAndSendToUser(String.valueOf(helloMessage.recipientId()),
                "/queue/messages",
                helloMessage.message());
    }

}
