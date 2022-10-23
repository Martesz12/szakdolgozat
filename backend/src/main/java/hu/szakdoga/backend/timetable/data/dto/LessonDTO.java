package hu.szakdoga.backend.timetable.data.dto;

import java.time.LocalTime;

public class LessonDTO {
    public final Long id;
    public final String day;
    public final LocalTime startTime;
    public final LocalTime endTime;
    public final String location;
    public final String type;
    public final Long subjectId;
    public final Long timetableId;
    public final Long teacherId;

    public LessonDTO(Long id, String day, LocalTime startTime, LocalTime endTime, String location, String type, Long subjectId, Long timetableId, Long teacherId) {
        this.id = id;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.type = type;
        this.subjectId = subjectId;
        this.timetableId = timetableId;
        this.teacherId = teacherId;
    }
}
