package rob.notificationservice;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
public class GreetingController {

    private final SimpMessagingTemplate template;

    @PostMapping("/send")
    public void sendMessage(@RequestBody HelloMessage helloMessage){
        template.convertAndSend("/topic/message", helloMessage.message());
    }

    @MessageMapping("/sendMessage")
    public void receiveMessage( @Payload  HelloMessage message) {
        System.out.println("Message received" + message.message());
    }

    @SendTo("/topic/message")
    public HelloMessage broadcastMessage(@Payload HelloMessage helloMessage){
        return helloMessage;
    }
}
