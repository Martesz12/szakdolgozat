package hu.szakdoga.backend.timetable.repository;

import hu.szakdoga.backend.timetable.data.entity.MainTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainTaskRepository extends JpaRepository<MainTaskEntity, Long> {

}
