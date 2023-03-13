package rob.imageservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rob.imageservice.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
