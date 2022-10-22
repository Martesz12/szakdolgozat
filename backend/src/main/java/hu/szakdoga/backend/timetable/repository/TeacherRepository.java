package hu.szakdoga.backend.timetable.repository;

import hu.szakdoga.backend.timetable.data.entity.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<TeacherEntity, Long> {

}
