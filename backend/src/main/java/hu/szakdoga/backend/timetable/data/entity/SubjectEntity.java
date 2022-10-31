package hu.szakdoga.backend.timetable.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hu.szakdoga.backend.authentication.data.model.UserEntity;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
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
    @ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="userId", referencedColumnName = "id")
    private UserEntity user;

    @JsonIgnore
    @OneToMany(mappedBy = "subject")
    private List<LessonEntity> lessons;

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
