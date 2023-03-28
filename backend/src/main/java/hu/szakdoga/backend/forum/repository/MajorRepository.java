package hu.szakdoga.backend.forum.repository;

import hu.szakdoga.backend.forum.data.entity.MajorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MajorRepository extends JpaRepository<MajorEntity, Long> {
    @Query("SELECT major FROM MajorEntity major WHERE major.id IN ?1")
    List<MajorEntity> findMajorsByIds(List<Long> id);
}
