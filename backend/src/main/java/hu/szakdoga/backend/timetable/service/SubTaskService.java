package hu.szakdoga.backend.timetable.service;

import hu.szakdoga.backend.timetable.data.dto.SubTaskDTO;
import hu.szakdoga.backend.timetable.data.entity.MainTaskEntity;
import hu.szakdoga.backend.timetable.data.entity.SubTaskEntity;
import hu.szakdoga.backend.timetable.repository.MainTaskRepository;
import hu.szakdoga.backend.timetable.repository.SubTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class SubTaskService {

    private final SubTaskRepository subTaskRepository;
    private final MainTaskRepository mainTaskRepository;

    @Autowired
    public SubTaskService(SubTaskRepository subTaskRepository, MainTaskRepository mainTaskRepository){
        this.subTaskRepository = subTaskRepository;
        this.mainTaskRepository = mainTaskRepository;
    }

    public SubTaskEntity addSubTask(SubTaskEntity subTask){
        return subTaskRepository.save(subTask);
    }

    public List<SubTaskEntity> findAllSubTask(){
        return subTaskRepository.findAll();
    }

    public SubTaskEntity findSubTaskById(Long id){
        return subTaskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("SubTask by id " + id + " was not found."));
    }

    public SubTaskEntity updateSubTask(SubTaskEntity subTask){
        return subTaskRepository.save(subTask);
    }

    public void deleteSubTask(Long id){
        boolean exist = subTaskRepository.existsById(id);
        if(!exist)
            throw new IllegalStateException("SubTask with id " + id + " does not exist.");
        subTaskRepository.deleteById(id);
    }

    public SubTaskEntity convertDtoToEntity(SubTaskDTO dto){
        MainTaskEntity mainTask = mainTaskRepository.findById(dto.mainTaskId)
                .orElseThrow(() -> new EntityNotFoundException("MainTask by id " + dto.mainTaskId + " was not found."));

        return new SubTaskEntity(dto.id,
                dto.name,
                dto.fulfilled,
                mainTask);
    }

    public SubTaskDTO convertEntityToDto(SubTaskEntity entity){
        return new SubTaskDTO(entity.getId(), entity.getName(), entity.isFulfilled(), entity.getMainTask().getId());
    }
}
