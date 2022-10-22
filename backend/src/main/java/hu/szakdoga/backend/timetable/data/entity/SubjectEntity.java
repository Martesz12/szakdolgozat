package hu.szakdoga.backend.timetable.data.entity;

import hu.szakdoga.backend.authentication.data.model.UserEntity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Entity
@Table(name = "subject")
public class SubjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "Name must be set (subject)")
    private String name;

    @Column(nullable = false)
    @NotEmpty(message = "Abbreviation must be set (subject)")
    private String abbreviation;

    @Column(nullable = false)
    @NotEmpty(message = "Color must be set (subject)")
    private String color;

    @Column()
    private String requirement;

    //***Constraints***
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="userId")
    private UserEntity user;

    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    private List<LessonEntity> lessons;
}
