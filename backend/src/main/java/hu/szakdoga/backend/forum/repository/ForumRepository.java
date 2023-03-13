package hu.szakdoga.backend.forum.repository;

import hu.szakdoga.backend.forum.data.entity.ForumEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumRepository extends JpaRepository<ForumEntity, Long> {
}
