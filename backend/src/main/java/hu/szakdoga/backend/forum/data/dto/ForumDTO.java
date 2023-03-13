package hu.szakdoga.backend.forum.data.dto;

import hu.szakdoga.backend.forum.data.entity.FacultyEntity;
import hu.szakdoga.backend.forum.data.entity.MajorEntity;
import hu.szakdoga.backend.forum.data.entity.UniversityEntity;

import java.util.List;

public class ForumDTO {
    public final Long id;
    public final String name;
    public final String description;
    public final UniversityEntity university;
    public final List<FacultyEntity> facultyIds;
    public final List<MajorEntity> majorIds;

    public ForumDTO(Long id, String name, String description, UniversityEntity university, List<FacultyEntity> facultyIds, List<MajorEntity> majorIds) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.university = university;
        this.facultyIds = facultyIds;
        this.majorIds = majorIds;;
    }
}
