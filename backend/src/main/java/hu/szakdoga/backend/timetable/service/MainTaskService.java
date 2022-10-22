package hu.szakdoga.backend.timetable.service;

import hu.szakdoga.backend.timetable.data.entity.MainTaskEntity;
import hu.szakdoga.backend.timetable.repository.MainTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class MainTaskService {

    private final MainTaskRepository mainTaskRepository;

    @Autowired
    public MainTaskService(MainTaskRepository mainTaskRepository){
        this.mainTaskRepository = mainTaskRepository;
    }

    public MainTaskEntity addMainTask(MainTaskEntity mainTask){
        return mainTaskRepository.save(mainTask);
    }

    public List<MainTaskEntity> findAllMainTask(){
        return mainTaskRepository.findAll();
    }

    public MainTaskEntity findMainTaskById(Long id){
        return mainTaskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("MainTask by id " + id + " was not found."));
    }

    public MainTaskEntity updateMainTask(MainTaskEntity mainTask){
        return mainTaskRepository.save(mainTask);
    }

    public void deleteMainTask(Long id){
        boolean exist = mainTaskRepository.existsById(id);
        if(!exist)
            throw new IllegalStateException("MainTask with id " + id + " does not exist.");
        mainTaskRepository.deleteById(id);
    }
}
