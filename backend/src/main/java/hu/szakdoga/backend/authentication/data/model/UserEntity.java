package hu.szakdoga.backend.authentication.data.model;

import hu.szakdoga.backend.timetable.data.entity.SubjectEntity;
import hu.szakdoga.backend.timetable.data.entity.TeacherEntity;
import hu.szakdoga.backend.timetable.data.entity.TimetableEntity;

import javax.persistence.*;
import java.util.List;

@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private Long primaryTimetableId;

    //***Constraints***
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SubjectEntity> subjects;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<TeacherEntity> teachers;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<TimetableEntity> timetables;
}
