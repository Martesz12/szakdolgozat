package hu.szakdoga.backend.timetable.service;

import hu.szakdoga.backend.authentication.data.model.UserEntity;
import hu.szakdoga.backend.authentication.repository.UserRepository;
import hu.szakdoga.backend.timetable.data.dto.TeacherDTO;
import hu.szakdoga.backend.timetable.data.entity.TeacherEntity;
import hu.szakdoga.backend.timetable.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository, UserRepository userRepository){
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
    }

    public List<TeacherDTO> findAllTeacher(){
        return teacherRepository.findAll().stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public TeacherDTO findTeacherById(Long id){
        return convertEntityToDto(teacherRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Teacher by id " + id + " was not found.")));
    }

    public TeacherDTO addTeacher(TeacherDTO teacher){
        return convertEntityToDto(teacherRepository.save(convertDtoToEntity(teacher)));
    }

    public TeacherDTO updateTeacher(TeacherDTO teacher){
        return convertEntityToDto(teacherRepository.save(convertDtoToEntity(teacher)));
    }

    public void deleteTeacher(Long id){
        boolean exist = teacherRepository.existsById(id);
        if(!exist)
            throw new IllegalStateException("Teacher with id " + id + " does not exist.");
        teacherRepository.deleteById(id);
    }

    public TeacherEntity convertDtoToEntity(TeacherDTO dto){
        UserEntity user = userRepository.findById(dto.userId)
                .orElseThrow(() -> new EntityNotFoundException("User by id " + dto.userId + " was not found."));

        return new TeacherEntity(dto.id,
                dto.name,
                dto.webpage,
                dto.email,
                user);
    }

    public TeacherDTO convertEntityToDto(TeacherEntity entity){
        return new TeacherDTO(entity.getId(), entity.getName(), entity.getWebpage(), entity.getEmail(),
                entity.getUser().getId());
    }
}
