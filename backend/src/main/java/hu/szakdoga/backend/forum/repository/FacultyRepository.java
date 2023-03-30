package hu.szakdoga.backend.forum.repository;

import hu.szakdoga.backend.forum.data.entity.FacultyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyRepository extends JpaRepository<FacultyEntity, Long> {
    @Query("SELECT faculty FROM FacultyEntity faculty WHERE faculty.id IN ?1")
    List<FacultyEntity> findFacultiesByIds(List<Long> id);
}
