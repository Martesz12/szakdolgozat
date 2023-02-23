package hu.szakdoga.backend.timetable.repository;

import hu.szakdoga.backend.timetable.data.entity.MainTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MainTaskRepository extends JpaRepository<MainTaskEntity, Long> {
    @Query("SELECT mainTask FROM MainTaskEntity mainTask WHERE mainTask.lesson.id IN ?1")
    List<MainTaskEntity> getMainTasksByLessonIds(Long[] lessonIds);
}
