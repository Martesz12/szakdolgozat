package hu.szakdoga.backend.timetable.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hu.szakdoga.backend.authentication.data.model.UserEntity;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Entity
@Table(name = "teacher")
@Data
public class TeacherEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "Name must be set (teacher)")
    private String name;

    @Column()
    private String webpage;

    @Column()
    @Email
    private String email;

    //***Constraints***
    @ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="userId", referencedColumnName = "id")
    private UserEntity user;

    @JsonIgnore
    @OneToMany(mappedBy = "teacher")
    private List<LessonEntity> lessons;

    public TeacherEntity(Long id, String name, String webpage, String email, UserEntity user) {
        this.id = id;
        this.name = name;
        this.webpage = webpage;
        this.email = email;
        this.user = user;
    }

    public TeacherEntity() {
    }
}
