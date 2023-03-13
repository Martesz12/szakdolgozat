package hu.szakdoga.backend.forum.repository;

import hu.szakdoga.backend.forum.data.entity.UniversityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversityRepository extends JpaRepository<UniversityEntity, Long> {
}
