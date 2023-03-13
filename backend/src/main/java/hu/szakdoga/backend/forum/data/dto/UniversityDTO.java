package hu.szakdoga.backend.forum.data.dto;

public class UniversityDTO {
    public final Long id;
    public final String name;
    public final String abbreviation;

    public UniversityDTO(Long id, String name, String abbreviation) {
        this.id = id;
        this.name = name;
        this.abbreviation = abbreviation;
    }
}
