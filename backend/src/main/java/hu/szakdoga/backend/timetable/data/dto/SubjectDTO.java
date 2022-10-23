package hu.szakdoga.backend.timetable.data.dto;

public class SubjectDTO {
    public final Long id;
    public final String name;
    public final String abbreviation;
    public final String color;
    public final String requirement;
    public final Long userId;

    public SubjectDTO(Long id, String name, String abbreviation, String color, String requirement, Long userId) {
        this.id = id;
        this.name = name;
        this.abbreviation = abbreviation;
        this.color = color;
        this.requirement = requirement;
        this.userId = userId;
    }
}
