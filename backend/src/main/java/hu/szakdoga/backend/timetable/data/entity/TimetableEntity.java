package hu.szakdoga.backend.timetable.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hu.szakdoga.backend.authentication.data.model.UserEntity;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
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
//    @NotEmpty(message = "Name must be set (timetable)")
    private String name;

    //***Constraints***
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="userId", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private UserEntity user;

    public TimetableEntity(Long id, String name, UserEntity user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    public TimetableEntity() {
    }
}
