package rob.imageservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import rob.imageservice.entity.Image;
import rob.imageservice.repository.ImageRepository;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageService {
    private final ImageRepository imageRepository;

    public Image uploadNewImage(MultipartFile multipartFile) {
        try {
            return imageRepository.save(
                    Image.builder()
                    .name(multipartFile.getOriginalFilename())
                    .data(multipartFile.getBytes())
                    .build());
        }
        catch(IOException e){
            log.error("Something went wrong when adding new image {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Something went wrong when adding new image");
        }
    }

    public Image getImageById(long id) {
        return imageRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
    }
}
