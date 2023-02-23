package hu.szakdoga.backend.timetable.repository;

import hu.szakdoga.backend.timetable.data.entity.MainTaskEntity;
import hu.szakdoga.backend.timetable.data.entity.SubTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubTaskRepository extends JpaRepository<SubTaskEntity, Long> {

    @Query("SELECT subTask FROM SubTaskEntity subTask WHERE subTask.mainTask.id IN ?1")
    List<SubTaskEntity> getSubTasksByMainTaskIds(Long[] mainTaskIds);
}
