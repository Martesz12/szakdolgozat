package hu.szakdoga.backend.forum.data.entity;

import hu.szakdoga.backend.timetable.data.entity.LessonEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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

    @Column()
    private String description;

    @Column(nullable = false)
    private boolean approved;

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "universityId", referencedColumnName = "id")
    private UniversityEntity university;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinTable(
            name="forumAndMajor",
            inverseJoinColumns = @JoinColumn(name = "majorId"),
            joinColumns = @JoinColumn(name = "forumId")
    )
    private List<MajorEntity> majors;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinTable(
            name="forumAndFaculty",
            inverseJoinColumns = @JoinColumn(name = "facultyId"),
            joinColumns = @JoinColumn(name = "forumId")
    )
    private List<FacultyEntity> faculties;

    @OneToMany(mappedBy = "forum", cascade = {CascadeType.REMOVE})
    private List<MessageEntity> messages = new ArrayList<>();

    public ForumEntity(Long id, String name, String description, boolean approved, UniversityEntity university, List<MajorEntity> majors, List<FacultyEntity> faculties) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.approved = approved;
        this.university = university;
        this.majors = majors;
        this.faculties = faculties;
    }
}
