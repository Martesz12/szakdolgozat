package hu.szakdoga.backend.authentication.service;

import hu.szakdoga.backend.authentication.data.dto.UserDTO;
import hu.szakdoga.backend.authentication.data.model.Role;
import hu.szakdoga.backend.authentication.data.model.UserEntity;
import hu.szakdoga.backend.authentication.repository.UserRepository;
import hu.szakdoga.backend.timetable.data.dto.LessonDTO;
import hu.szakdoga.backend.timetable.data.entity.LessonEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<UserDTO> findUsersByIds(List<Long> userId) {
        return this.userRepository.findUsersByIds(userId).stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public UserDTO convertEntityToDto(UserEntity entity){
        return UserDTO.builder()
                .id(entity.getId())
                .appUsername(entity.getAppUsername())
                .role(entity.getRole())
                .email(entity.getEmail())
                .firstname(entity.getFirstname())
                .lastname(entity.getLastname())
                .build();
    }
}
