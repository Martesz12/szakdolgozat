package hu.szakdoga.backend.authentication.service;

import hu.szakdoga.backend.authentication.data.dto.UserDTO;
import hu.szakdoga.backend.authentication.data.model.AuthenticationRequest;
import hu.szakdoga.backend.authentication.data.model.AuthenticationResponse;
import hu.szakdoga.backend.authentication.config.JwtService;
import hu.szakdoga.backend.authentication.data.model.RegisterRequest;
import hu.szakdoga.backend.authentication.data.model.Role;
import hu.szakdoga.backend.authentication.data.model.UserEntity;
import hu.szakdoga.backend.authentication.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = UserEntity.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .appUsername(request.getAppUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userDto(convertUserEntityToDTO(user))
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userDto(convertUserEntityToDTO(user))
                .build();
    }

    UserDTO convertUserEntityToDTO(UserEntity user) {
        return UserDTO.builder()
                .id(user.getId())
                .appUsername(user.getAppUsername())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
