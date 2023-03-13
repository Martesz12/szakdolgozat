package hu.szakdoga.backend.forum.repository;

import hu.szakdoga.backend.forum.data.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
}
