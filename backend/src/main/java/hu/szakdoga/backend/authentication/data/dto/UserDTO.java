package hu.szakdoga.backend.authentication.data.dto;

import hu.szakdoga.backend.authentication.data.model.Role;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class UserDTO {
    private final Long id;
    private final String firstname;
    private final String lastname;
    private final String appUsername;
    private final String email;
    private final Role role;
    private final Long timetablePreference;
    private final Long universityPreference;
    private final List<Long> facultiesPreference;
    private final List<Long> majorsPreference;
}
