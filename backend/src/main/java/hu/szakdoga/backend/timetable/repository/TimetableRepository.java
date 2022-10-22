package hu.szakdoga.backend.timetable.repository;

import hu.szakdoga.backend.timetable.data.entity.TimetableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimetableRepository extends JpaRepository<TimetableEntity, Long> {

}
