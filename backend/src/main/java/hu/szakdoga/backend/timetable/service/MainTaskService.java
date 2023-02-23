package hu.szakdoga.backend.timetable.service;

import hu.szakdoga.backend.timetable.data.dto.MainTaskDTO;
import hu.szakdoga.backend.timetable.data.entity.LessonEntity;
import hu.szakdoga.backend.timetable.data.entity.MainTaskEntity;
import hu.szakdoga.backend.timetable.repository.LessonRepository;
import hu.szakdoga.backend.timetable.repository.MainTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MainTaskService {

    private final MainTaskRepository mainTaskRepository;
    private final LessonRepository lessonRepository;

    @Autowired
    public MainTaskService(MainTaskRepository mainTaskRepository, LessonRepository lessonRepository) {
        this.mainTaskRepository = mainTaskRepository;
        this.lessonRepository = lessonRepository;
    }

    public List<MainTaskDTO> findAllMainTask() {
        return mainTaskRepository.findAll().stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public List<MainTaskDTO> getMainTasksByLessonIds(long[] lessonIds) {
        Long[] convertedLessonIds = Arrays.stream(lessonIds).boxed().toArray( Long[]::new );
        return mainTaskRepository.getMainTasksByLessonIds
                        (convertedLessonIds)
                .stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public MainTaskDTO findMainTaskById(Long id) {
        return convertEntityToDto(mainTaskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("MainTask by id " + id + " was not found.")));
    }

    public MainTaskDTO addMainTask(MainTaskDTO mainTask) {
        return convertEntityToDto(mainTaskRepository.save(convertDtoToEntity(mainTask)));
    }

    public MainTaskDTO updateMainTask(MainTaskDTO mainTask) {
        return convertEntityToDto(mainTaskRepository.save(convertDtoToEntity(mainTask)));
    }

    public void deleteMainTask(Long id) {
        boolean exist = mainTaskRepository.existsById(id);
        if (!exist)
            throw new IllegalStateException("MainTask with id " + id + " does not exist.");
        mainTaskRepository.deleteById(id);
    }

    public MainTaskEntity convertDtoToEntity(MainTaskDTO dto) {
        LessonEntity lesson = lessonRepository.findById(dto.lessonId)
                .orElseThrow(() -> new EntityNotFoundException("Lesson by id " + dto.lessonId + " was not found."));

        return new MainTaskEntity(dto.id,
                dto.name,
                dto.fulfilled,
                dto.deadline,
                dto.note,
                dto.type,
                lesson);
    }

    public MainTaskDTO convertEntityToDto(MainTaskEntity entity) {
        return new MainTaskDTO(entity.getId(), entity.getName(), entity.isFulfilled(),
                entity.getDeadline(), entity.getNote(), entity.getType(), entity.getLesson().getId());
    }
}
