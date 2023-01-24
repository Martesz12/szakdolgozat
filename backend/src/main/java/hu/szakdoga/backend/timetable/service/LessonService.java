package hu.szakdoga.backend.timetable.service;

import hu.szakdoga.backend.timetable.data.dto.LessonDTO;
import hu.szakdoga.backend.timetable.data.entity.LessonEntity;
import hu.szakdoga.backend.timetable.data.entity.SubjectEntity;
import hu.szakdoga.backend.timetable.data.entity.TeacherEntity;
import hu.szakdoga.backend.timetable.data.entity.TimetableEntity;
import hu.szakdoga.backend.timetable.repository.LessonRepository;
import hu.szakdoga.backend.timetable.repository.SubjectRepository;
import hu.szakdoga.backend.timetable.repository.TeacherRepository;
import hu.szakdoga.backend.timetable.repository.TimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;
    private final SubjectRepository subjectRepository;
    private final TimetableRepository timetableRepository;
    private final TeacherRepository teacherRepository;

    @Autowired
    public LessonService(LessonRepository lessonRepository,SubjectRepository subjectRepository,
                         TimetableRepository timetableRepository, TeacherRepository teacherRepository) {
        this.lessonRepository = lessonRepository;
        this.subjectRepository = subjectRepository;
        this.timetableRepository = timetableRepository;
        this.teacherRepository = teacherRepository;
    }

    public List<LessonDTO> findAllLessons() {
        return lessonRepository.findAll().stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public LessonDTO findLessonById(Long id) {
        return convertEntityToDto(lessonRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Lesson by id " + id + " was not found.")));
    }

    public LessonDTO addLesson(LessonDTO lesson) {
        return convertEntityToDto(lessonRepository.save(convertDtoToEntity(lesson)));
    }

    public LessonDTO updateLesson(LessonDTO lesson) {
        return convertEntityToDto(lessonRepository.save(convertDtoToEntity(lesson)));
    }

    public void deleteLesson(Long id) {
        boolean exist = lessonRepository.existsById(id);
        if (!exist)
            throw new IllegalStateException("Lesson with id " + id + " does not exist.");
        lessonRepository.deleteById(id);
    }

    public LessonEntity convertDtoToEntity(LessonDTO dto) {
        SubjectEntity subject = subjectRepository.findById(dto.subjectId)
                .orElseThrow(() -> new EntityNotFoundException("Subject by id " + dto.subjectId + " was not found."));
        TimetableEntity timetable = timetableRepository.findById(dto.timetableId)
                .orElseThrow(() -> new EntityNotFoundException("Timetable by id " + dto.timetableId + " was not found."));
        TeacherEntity teacher = teacherRepository.findById(dto.teacherId)
                .orElseThrow(() -> new EntityNotFoundException("Teacher by id " + dto.teacherId + " was not found."));

        return new LessonEntity(dto.id,
                dto.day,
                dto.startTime,
                dto.endTime,
                dto.location,
                dto.type,
                subject,
                timetable,
                teacher);
    }

    public LessonDTO convertEntityToDto(LessonEntity entity){
        return new LessonDTO(entity.getId(), entity.getDay(), entity.getStartTime(), entity.getEndTime(),
                entity.getLocation(), entity.getType(), entity.getSubject().getId(), entity.getTimetable().getId(),
                entity.getTeacher().getId());
    }
}
