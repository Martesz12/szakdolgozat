package hu.szakdoga.backend.timetable.repository;

import hu.szakdoga.backend.timetable.data.entity.TimetableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimetableRepository extends JpaRepository<TimetableEntity, Long> {

    List<TimetableEntity> findByUser_Id(Long userId);
}
