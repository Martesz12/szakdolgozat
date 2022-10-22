package hu.szakdoga.backend.timetable.repository;

import hu.szakdoga.backend.timetable.data.entity.LessonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends JpaRepository<LessonEntity, Long> {

}
