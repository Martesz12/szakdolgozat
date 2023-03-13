package hu.szakdoga.backend.forum.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "forum")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForumEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "universityId", referencedColumnName = "id")
    private UniversityEntity university;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "facultyId", referencedColumnName = "id")
    private FacultyEntity faculty;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "majorId", referencedColumnName = "id")
    private MajorEntity major;
}
