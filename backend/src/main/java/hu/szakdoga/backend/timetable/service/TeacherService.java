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

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository, UserRepository userRepository){
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
    }

    public TeacherEntity addTeacher(TeacherEntity teacher){
        return teacherRepository.save(teacher);
    }

    public List<TeacherEntity> findAllTeacher(){
        return teacherRepository.findAll();
    }

    public TeacherEntity findTeacherById(Long id){
        return teacherRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Teacher by id " + id + " was not found."));
    }

    public TeacherEntity updateTeacher(TeacherEntity teacher){
        return teacherRepository.save(teacher);
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
