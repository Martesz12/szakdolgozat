package hu.szakdoga.backend.forum.repository;

import hu.szakdoga.backend.forum.data.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    List<MessageEntity> findByForum_Id(Long forumId);
}
