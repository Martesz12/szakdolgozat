package hu.szakdoga.backend.authentication.service;

import hu.szakdoga.backend.authentication.data.dto.UserDTO;
import hu.szakdoga.backend.authentication.data.model.Role;
import hu.szakdoga.backend.authentication.data.model.UserEntity;
import hu.szakdoga.backend.authentication.repository.UserRepository;
import hu.szakdoga.backend.forum.data.dto.ForumDTO;
import hu.szakdoga.backend.timetable.data.dto.LessonDTO;
import hu.szakdoga.backend.timetable.data.entity.LessonEntity;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
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

    public UserDTO findUserByToken(String token){
        return convertEntityToDto(userRepository.findUserByToken(token)
                .orElseThrow(() -> new EntityNotFoundException("Forum by token was not found.")));
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
