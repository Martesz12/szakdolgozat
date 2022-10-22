package hu.szakdoga.backend.timetable.data.dto;

import java.time.LocalTime;

public class LessonDTO {
    private Long id;
    private String day;
    private LocalTime startTime;
    private LocalTime endTime;
    private String location;
    private String type;
    private Long subjectId;
    private Long timetableId;
    private Long teacherId;
}
