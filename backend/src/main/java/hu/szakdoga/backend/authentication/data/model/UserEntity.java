package hu.szakdoga.backend.authentication.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hu.szakdoga.backend.timetable.data.entity.SubjectEntity;
import hu.szakdoga.backend.timetable.data.entity.TeacherEntity;
import hu.szakdoga.backend.timetable.data.entity.TimetableEntity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private Long primaryTimetableId;

    //***Constraints***
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<SubjectEntity> subjects;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<TeacherEntity> teachers;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<TimetableEntity> timetables;
}
