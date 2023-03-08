package hu.szakdoga.backend.authentication.data.dto;

import hu.szakdoga.backend.authentication.data.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
