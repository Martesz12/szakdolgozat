package hu.szakdoga.backend.timetable.repository;

import hu.szakdoga.backend.timetable.data.entity.SubTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubTaskRepository extends JpaRepository<SubTaskEntity, Long> {

}
