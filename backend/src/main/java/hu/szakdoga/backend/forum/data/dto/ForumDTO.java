package hu.szakdoga.backend.forum.data.dto;

import java.util.List;

public class ForumDTO {
    public final Long id;
    public final String name;
    public final String description;
    public final Long universityId;
    public final List<Long> facultyIds;
    public final List<Long> majorIds;

    public ForumDTO(Long id, String name, String description, Long universityId, List<Long> facultyIds, List<Long> majorIds) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.universityId = universityId;
        this.facultyIds = facultyIds;
        this.majorIds = majorIds;;
    }
}
