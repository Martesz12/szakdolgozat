package hu.szakdoga.backend.timetable.data.dto;

public class TeacherDTO {
    public final Long id;
    public final String name;
    public final String webpage;
    public final String email;
    public final Long userId;

    public TeacherDTO(Long id, String name, String webpage, String email, Long userId) {
        this.id = id;
        this.name = name;
        this.webpage = webpage;
        this.email = email;
        this.userId = userId;
    }
}
