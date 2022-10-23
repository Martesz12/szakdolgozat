package hu.szakdoga.backend.timetable.data.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "subTask")
@Data
public class SubTaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "Name must be set (subTask)")
    private String name;

    @Column(nullable = false)
    @NotEmpty(message = "Fulfilled must be set (subTask)")
    private boolean fulfilled;

    //***Constraints***
    @ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="mainTaskId", referencedColumnName = "id")
    private MainTaskEntity mainTask;
}
