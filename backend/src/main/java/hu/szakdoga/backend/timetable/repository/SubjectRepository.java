package hu.szakdoga.backend.timetable.repository;

import hu.szakdoga.backend.timetable.data.entity.SubjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<SubjectEntity, Long> {

    List<SubjectEntity> findByUser_Id(Long userId);
}
