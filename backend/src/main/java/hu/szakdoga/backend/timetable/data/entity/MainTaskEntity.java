package hu.szakdoga.backend.timetable.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
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
//    @NotEmpty(message = "Name must be set (mainTask)")
    private String name;

    @Column(nullable = false)
//    @NotEmpty(message = "Fulfilled must be set (mainTask)")
    private boolean fulfilled;

    @Column(nullable = false)
//    @NotEmpty(message = "Deadline must be set (mainTask)")
    private Date deadline;

    @Column()
    private String note;

    @Column(nullable = false)
//    @NotEmpty(message = "Type must be set (mainTask)")
    private String type;

    //***Constraints***
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="lessonId", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private LessonEntity lesson;

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
