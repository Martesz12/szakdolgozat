package hu.szakdoga.backend.forum.data.dto;

public class MajorDTO {
    public final Long id;
    public final String name;
    public final String abbreviation;

    public MajorDTO(Long id, String name, String abbreviation) {
        this.id = id;
        this.name = name;
        this.abbreviation = abbreviation;
    }
}
