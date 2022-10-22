package hu.szakdoga.backend.timetable.data.dto;

import java.util.Date;

public class MainTaskDTO {
    private Long id;
    private String name;
    private boolean fulfilled;
    private Date deadline;
    private String note;
    private String type;
    private Long lessonId;
}
