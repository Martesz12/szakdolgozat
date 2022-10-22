package hu.szakdoga.backend.timetable.service;

import hu.szakdoga.backend.timetable.data.entity.TeacherEntity;
import hu.szakdoga.backend.timetable.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository){
        this.teacherRepository = teacherRepository;
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
}
