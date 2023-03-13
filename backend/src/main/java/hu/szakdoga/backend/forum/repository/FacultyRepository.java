package hu.szakdoga.backend.forum.repository;

import hu.szakdoga.backend.forum.data.entity.FacultyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends JpaRepository<FacultyEntity, Long> {
}
