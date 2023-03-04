package hu.szakdoga.backend.timetable.data.entity;

import hu.szakdoga.backend.authentication.data.model.UserEntity;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subject")
@Data
public class SubjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String abbreviation;

    @Column(nullable = false)
    private String color;

    @Column()
    @Lob
    private String requirement;

    //***Constraints***
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "userId", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private UserEntity user;

    @OneToMany(mappedBy = "subject", cascade = {CascadeType.REMOVE})
    private List<LessonEntity> lessons = new ArrayList<>();

    public SubjectEntity(Long id, String name, String abbreviation, String color, String requirement, UserEntity user) {
        this.id = id;
        this.name = name;
        this.abbreviation = abbreviation;
        this.color = color;
        this.requirement = requirement;
        this.user = user;
    }

    public SubjectEntity() {
    }
}
