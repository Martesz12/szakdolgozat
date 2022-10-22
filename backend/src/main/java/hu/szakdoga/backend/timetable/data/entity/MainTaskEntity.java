package hu.szakdoga.backend.timetable.data.entity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "mainTask")
public class MainTaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "Name must be set (mainTask)")
    private String name;

    @Column(nullable = false)
    @NotEmpty(message = "Fulfilled must be set (mainTask)")
    private boolean fulfilled;

    @Column(nullable = false)
    @NotEmpty(message = "Deadline must be set (mainTask)")
    private Date deadline;

    @Column()
    private String note;

    @Column(nullable = false)
    @NotEmpty(message = "Type must be set (mainTask)")
    private String type;

    //***Constraints***
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="lessonId")
    private LessonEntity lesson;

    @OneToMany(mappedBy = "mainTask", cascade = CascadeType.ALL)
    private List<SubTaskEntity> subTasks;
}
