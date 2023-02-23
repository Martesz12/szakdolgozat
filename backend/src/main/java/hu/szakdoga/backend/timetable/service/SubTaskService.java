package hu.szakdoga.backend.timetable.service;

import hu.szakdoga.backend.timetable.data.dto.MainTaskDTO;
import hu.szakdoga.backend.timetable.data.dto.SubTaskDTO;
import hu.szakdoga.backend.timetable.data.entity.MainTaskEntity;
import hu.szakdoga.backend.timetable.data.entity.SubTaskEntity;
import hu.szakdoga.backend.timetable.repository.MainTaskRepository;
import hu.szakdoga.backend.timetable.repository.SubTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubTaskService {

    private final SubTaskRepository subTaskRepository;
    private final MainTaskRepository mainTaskRepository;

    @Autowired
    public SubTaskService(SubTaskRepository subTaskRepository, MainTaskRepository mainTaskRepository){
        this.subTaskRepository = subTaskRepository;
        this.mainTaskRepository = mainTaskRepository;
    }

    public List<SubTaskDTO> findAllSubTask(){
        return subTaskRepository.findAll().stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public SubTaskDTO findSubTaskById(Long id){
        return convertEntityToDto(subTaskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("SubTask by id " + id + " was not found.")));
    }

    public List<SubTaskDTO> getSubTasksByMainTaskIds(long[] mainTaskIds) {
        Long[] convertedMainTaskIds = Arrays.stream(mainTaskIds).boxed().toArray( Long[]::new );
        return subTaskRepository.getSubTasksByMainTaskIds
                        (convertedMainTaskIds)
                .stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public SubTaskDTO addSubTask(SubTaskDTO subTask){
        return convertEntityToDto(subTaskRepository.save(convertDtoToEntity(subTask)));
    }

    public SubTaskDTO updateSubTask(SubTaskDTO subTask){
        return convertEntityToDto(subTaskRepository.save(convertDtoToEntity(subTask)));
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
