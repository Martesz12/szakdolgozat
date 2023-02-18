package hu.szakdoga.backend.timetable.data.entity;

import hu.szakdoga.backend.authentication.data.model.UserEntity;
import lombok.Data;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "timetable")
@Data
public class TimetableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    //***Constraints***
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "userId", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private UserEntity user;

    @OneToMany(mappedBy = "timetable", cascade = {CascadeType.REMOVE})
    private List<LessonEntity> lessons = new ArrayList<>();

    public TimetableEntity(Long id, String name, UserEntity user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    public TimetableEntity() {
    }
}
