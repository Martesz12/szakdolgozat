package hu.szakdoga.backend.authentication.data.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationModifyRequest {
    private String oldEmail;
    private String newEmail;
    private String password;
}
