package hu.szakdoga.backend.timetable.repository;

import hu.szakdoga.backend.timetable.data.entity.LessonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<LessonEntity, Long> {
//    @Query("SELECT * FROM Lesson lesson WHERE lesson.user = :status and u.name = :name")
    List<LessonEntity> findByTimetable_Id(Long timetableId);
}
