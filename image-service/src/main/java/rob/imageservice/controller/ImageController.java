package rob.imageservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rob.imageservice.entity.Image;
import rob.imageservice.service.ImageService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image")
@CrossOrigin(value = "http://localhost:3000")
public class ImageController {

    private final ImageService imageService;
    @PostMapping("upload")
    @ResponseStatus(HttpStatus.CREATED)
    public Image uploadNewImage(@RequestParam("file") MultipartFile image)  {
        return imageService.uploadNewImage(image);
    }

    @GetMapping("{id}")
    public Image getImageById(@PathVariable long id){
        return imageService.getImageById(id);
    }
}
