package hu.szakdoga.backend.timetable.data.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "mainTask")
@Data
public class MainTaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean fulfilled;

    @Column(nullable = false)
    private Date deadline;

    @Column()
    @Lob
    private String note;

    @Column(nullable = false)
    private String type;

    //***Constraints***
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "lessonId", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private LessonEntity lesson;

    @OneToMany(mappedBy = "mainTask", cascade = {CascadeType.REMOVE})
    private List<SubTaskEntity> subTasks = new ArrayList<>();

    public MainTaskEntity(Long id, String name, boolean fulfilled, Date deadline, String note, String type, LessonEntity lesson) {
        this.id = id;
        this.name = name;
        this.fulfilled = fulfilled;
        this.deadline = deadline;
        this.note = note;
        this.type = type;
        this.lesson = lesson;
    }

    public MainTaskEntity() {
    }
}
