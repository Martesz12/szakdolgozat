package hu.szakdoga.backend.timetable.data.entity;

import lombok.Data;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lesson")
@Data
public class LessonEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String day;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @Column()
    private String location;

    @Column(nullable = false)
    private String type;

    //***Constraints***
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "subjectId", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private SubjectEntity subject;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "timetableId", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private TimetableEntity timetable;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "teacherId", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private TeacherEntity teacher;

    @OneToMany(mappedBy = "lesson", cascade = {CascadeType.REMOVE})
    private List<MainTaskEntity> mainTasks = new ArrayList<>();

    public LessonEntity(Long id, String day, LocalTime startTime, LocalTime endTime, String location, String type, SubjectEntity subject, TimetableEntity timetable, TeacherEntity teacher) {
        this.id = id;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.type = type;
        this.subject = subject;
        this.timetable = timetable;
        this.teacher = teacher;
    }

    public LessonEntity() {
    }
}
