package hu.szakdoga.backend.authentication.data.model;

import hu.szakdoga.backend.authentication.data.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private UserDTO userDto;
}
