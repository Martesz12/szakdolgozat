package hu.szakdoga.backend.forum.repository;

import hu.szakdoga.backend.forum.data.entity.ForumEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumRepository extends JpaRepository<ForumEntity, Long> {
}
