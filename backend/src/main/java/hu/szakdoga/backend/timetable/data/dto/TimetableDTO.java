package hu.szakdoga.backend.timetable.data.dto;

public class TimetableDTO {
    public final Long id;
    public final String name;
    public final Long userId;

    public TimetableDTO(Long id, String name, Long userId) {
        this.id = id;
        this.name = name;
        this.userId = userId;
    }
}
