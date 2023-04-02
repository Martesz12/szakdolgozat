package hu.szakdoga.backend.authentication.service;

import hu.szakdoga.backend.authentication.data.dto.UserDTO;
import hu.szakdoga.backend.authentication.data.model.AuthenticationModifyRequest;
import hu.szakdoga.backend.authentication.data.model.AuthenticationRequest;
import hu.szakdoga.backend.authentication.data.model.UserEntity;
import hu.szakdoga.backend.authentication.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserDTO> findUsersByIds(List<Long> userId) {
        return this.userRepository.findUsersByIds(userId).stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public UserDTO findUserByToken(String token) {
        return convertEntityToDto(userRepository.findUserByToken(token)
                .orElseThrow(() -> new EntityNotFoundException("User by token was not found.")));
    }

    public UserDTO modifyUserPreference(UserDTO userDTO) {
        UserEntity originalUser = this.userRepository.findById(userDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("User by id was not found."));
        var updatedUser = convertDtoToEntity(userDTO, originalUser.getPassword());
        return convertEntityToDto(userRepository.save(updatedUser));
    }

    public UserDTO modifyUserAuthenticationData(AuthenticationModifyRequest authenticationRequest) {
        UserEntity originalUser = this.userRepository.findByEmail(authenticationRequest.getOldEmail())
                .orElseThrow(() -> new EntityNotFoundException("User by email was not found."));
        originalUser.setEmail(authenticationRequest.getNewEmail());
        if(!Objects.equals(authenticationRequest.getPassword(), "")) originalUser.setPassword(passwordEncoder.encode(authenticationRequest.getPassword()));
        return convertEntityToDto(userRepository.save(originalUser));
    }

    public UserDTO convertEntityToDto(UserEntity entity) {
        return UserDTO.builder()
                .id(entity.getId())
                .appUsername(entity.getAppUsername())
                .role(entity.getRole())
                .email(entity.getEmail())
                .firstname(entity.getFirstname())
                .lastname(entity.getLastname())
                .timetablePreference(entity.getTimetablePreference())
                .universityPreference(entity.getUniversityPreference())
                .facultiesPreference(entity.getFacultiesPreference())
                .majorsPreference(entity.getMajorsPreference())
                .build();
    }

    public UserEntity convertDtoToEntity(UserDTO userDTO, String password) {
        return UserEntity.builder()
                .id(userDTO.getId())
                .appUsername(userDTO.getAppUsername())
                .role(userDTO.getRole())
                .email(userDTO.getEmail())
                .password(password)
                .firstname(userDTO.getFirstname())
                .lastname(userDTO.getLastname())
                .timetablePreference(userDTO.getTimetablePreference())
                .universityPreference(userDTO.getUniversityPreference())
                .facultiesPreference(userDTO.getFacultiesPreference())
                .majorsPreference(userDTO.getMajorsPreference())
                .build();
    }
}
