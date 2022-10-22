package hu.szakdoga.backend.timetable.data.model;

import java.time.LocalTime;

public class Lesson {
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
