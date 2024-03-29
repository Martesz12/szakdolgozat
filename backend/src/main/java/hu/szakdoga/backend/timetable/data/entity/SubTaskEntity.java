package hu.szakdoga.backend.timetable.data.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.*;

@Entity
@Table(name = "subTask")
@Data
public class SubTaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean fulfilled;

    //***Constraints***
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "mainTaskId", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private MainTaskEntity mainTask;

    public SubTaskEntity(Long id, String name, boolean fulfilled, MainTaskEntity mainTask) {
        this.id = id;
        this.name = name;
        this.fulfilled = fulfilled;
        this.mainTask = mainTask;
    }

    public SubTaskEntity() {
    }
}
