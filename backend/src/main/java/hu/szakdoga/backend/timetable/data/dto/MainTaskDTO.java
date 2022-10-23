package hu.szakdoga.backend.timetable.data.dto;

import java.util.Date;

public class MainTaskDTO {
    public final Long id;
    public final String name;
    public final boolean fulfilled;
    public final Date deadline;
    public final String note;
    public final String type;
    public final Long lessonId;

    public MainTaskDTO(Long id, String name, boolean fulfilled, Date deadline, String note, String type, Long lessonId) {
        this.id = id;
        this.name = name;
        this.fulfilled = fulfilled;
        this.deadline = deadline;
        this.note = note;
        this.type = type;
        this.lessonId = lessonId;
    }
}
