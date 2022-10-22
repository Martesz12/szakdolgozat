package hu.szakdoga.backend.timetable.service;

import hu.szakdoga.backend.timetable.data.entity.TimetableEntity;
import hu.szakdoga.backend.timetable.repository.TimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TimetableService {

    private final TimetableRepository timetableRepository;

    @Autowired
    public TimetableService(TimetableRepository timetableRepository){
        this.timetableRepository = timetableRepository;
    }

    public TimetableEntity addTimetable(TimetableEntity timetable){
        return timetableRepository.save(timetable);
    }

    public List<TimetableEntity> findAllTimetable(){
        return timetableRepository.findAll();
    }

    public TimetableEntity findTimetableById(Long id){
        return timetableRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Timetable by id " + id + " was not found."));
    }

    public TimetableEntity updateTimetable(TimetableEntity timetable){
        return timetableRepository.save(timetable);
    }

    public void deleteTimetable(Long id){
        boolean exist = timetableRepository.existsById(id);
        if(!exist)
            throw new IllegalStateException("Timetable with id " + id + " does not exist.");
        timetableRepository.deleteById(id);
    }
}
