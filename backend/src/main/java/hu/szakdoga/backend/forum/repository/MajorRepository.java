package hu.szakdoga.backend.forum.repository;

import hu.szakdoga.backend.forum.data.entity.MajorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MajorRepository extends JpaRepository<MajorEntity, Long> {
}
