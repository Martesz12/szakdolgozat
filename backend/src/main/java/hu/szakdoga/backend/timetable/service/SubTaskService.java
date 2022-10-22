package hu.szakdoga.backend.timetable.service;

import hu.szakdoga.backend.timetable.data.entity.SubTaskEntity;
import hu.szakdoga.backend.timetable.repository.SubTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class SubTaskService {

    private final SubTaskRepository subTaskRepository;

    @Autowired
    public SubTaskService(SubTaskRepository subTaskRepository){
        this.subTaskRepository = subTaskRepository;
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
}
