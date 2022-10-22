package hu.szakdoga.backend.timetable.service;

import hu.szakdoga.backend.timetable.data.entity.LessonEntity;
import hu.szakdoga.backend.timetable.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;

    @Autowired
    public LessonService(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    public LessonEntity addLesson(LessonEntity lesson){
        return lessonRepository.save(lesson);
    }

    public List<LessonEntity> findAllLessons(){
        return lessonRepository.findAll();
    }

    public LessonEntity findLessonById(Long id){
        return lessonRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Lesson by id " + id + " was not found."));
    }

    public LessonEntity updateLesson(LessonEntity lesson){
        return lessonRepository.save(lesson);
    }

    public void deleteLesson(Long id){
        boolean exist = lessonRepository.existsById(id);
        if(!exist)
            throw new IllegalStateException("Lesson with id " + id + " does not exist.");
        lessonRepository.deleteById(id);
    }
}
