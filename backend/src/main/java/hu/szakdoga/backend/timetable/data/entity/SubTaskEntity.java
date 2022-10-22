package hu.szakdoga.backend.timetable.data.entity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "subTask")
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
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="mainTaskId")
    private MainTaskEntity mainTask;
}