package hu.szakdoga.backend.timetable.data.dto;

public class SubTaskDTO {
    public final Long id;
    public final String name;
    public final boolean fulfilled;
    public final Long mainTaskId;

    public SubTaskDTO(Long id, String name, boolean fulfilled, Long mainTaskId) {
        this.id = id;
        this.name = name;
        this.fulfilled = fulfilled;
        this.mainTaskId = mainTaskId;
    }
}
