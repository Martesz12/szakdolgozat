package hu.szakdoga.backend.timetable.data.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalTime;
import java.util.List;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name="lesson")
public class LessonEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "Day must be set (lesson)")
    private String day;

    @Column(nullable = false)
    @NotEmpty(message = "StartTime must be set (lesson)")
    private LocalTime startTime;

    @Column(nullable = false)
    @NotEmpty(message = "EndTime must be set (lesson)")
    private LocalTime endTime;

    @Column()
    private String location;

    @Column(nullable = false)
    @NotEmpty(message = "Type must be set (lesson)")
    private String type;

    //***Constraints***
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="subjectId")
    private SubjectEntity subject;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="timetableId")
    private TimetableEntity timetable;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="teacherId")
    private TeacherEntity teacher;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    private List<MainTaskEntity> mainTasks;
}
