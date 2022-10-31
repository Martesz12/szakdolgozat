package hu.szakdoga.backend.timetable.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalTime;
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
//    @NotEmpty(message = "Day must be set (lesson)")
    private String day;

    @Column(nullable = false)
//    @NotEmpty(message = "StartTime must be set (lesson)")
    private LocalTime startTime;

    @Column(nullable = false)
//    @NotEmpty(message = "EndTime must be set (lesson)")
    private LocalTime endTime;

    @Column()
    private String location;

    @Column(nullable = false)
//    @NotEmpty(message = "Type must be set (lesson)")
    private String type;

    //***Constraints***
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "subjectId", referencedColumnName = "id")
    private SubjectEntity subject;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "timetableId", referencedColumnName = "id")
    private TimetableEntity timetable;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "teacherId", referencedColumnName = "id")
    private TeacherEntity teacher;

    @JsonIgnore
    @OneToMany(mappedBy = "lesson")
    private List<MainTaskEntity> mainTasks;

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
