package hu.szakdoga.backend.timetable.data.dto;

import javax.persistence.Column;

public class TeacherDTO {
    public final Long id;
    public final String name;
    public final String webpage;
    public final String email;
    public final Long userId;

    public final String office;

    public final String moreInformation;

    public TeacherDTO(Long id, String name, String webpage, String email, Long userId, String office, String moreInformation) {
        this.id = id;
        this.name = name;
        this.webpage = webpage;
        this.email = email;
        this.userId = userId;
        this.office = office;
        this.moreInformation = moreInformation;
    }
}
