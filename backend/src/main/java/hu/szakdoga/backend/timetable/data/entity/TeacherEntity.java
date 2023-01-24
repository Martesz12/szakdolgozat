package hu.szakdoga.backend.timetable.data.entity;

import hu.szakdoga.backend.authentication.data.model.UserEntity;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "teacher")
@Data
public class TeacherEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column()
    private String webpage;

    @Column()
    private String email;

    //***Constraints***
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "userId", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private UserEntity user;

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
