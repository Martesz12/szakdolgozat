package hu.szakdoga.backend.forum.data.dto;

import hu.szakdoga.backend.forum.data.entity.UniversityEntity;

import java.util.List;

public class FacultyDTO {
    public final Long id;
    public final String name;
    public final UniversityEntity university;
    public final List<Long> majorIds;
    public final String abbreviation;

    public FacultyDTO(Long id, String name, UniversityEntity university, List<Long> majorIds, String abbreviation) {
        this.id = id;
        this.name = name;
        this.university = university;
        this.majorIds = majorIds;
        this.abbreviation = abbreviation;
    }
}
