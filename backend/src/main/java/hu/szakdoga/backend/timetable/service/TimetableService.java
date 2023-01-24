package hu.szakdoga.backend.timetable.service;

import hu.szakdoga.backend.authentication.data.model.UserEntity;
import hu.szakdoga.backend.authentication.repository.UserRepository;
import hu.szakdoga.backend.timetable.data.dto.TimetableDTO;
import hu.szakdoga.backend.timetable.data.entity.TimetableEntity;
import hu.szakdoga.backend.timetable.repository.TimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TimetableService {

    private final TimetableRepository timetableRepository;
    private final UserRepository userRepository;

    @Autowired
    public TimetableService(TimetableRepository timetableRepository, UserRepository userRepository){
        this.timetableRepository = timetableRepository;
        this.userRepository = userRepository;
    }

    public List<TimetableDTO> findAllTimetable(){
        return timetableRepository.findAll().stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public TimetableDTO findTimetableById(Long id){
        return convertEntityToDto(timetableRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Timetable by id " + id + " was not found.")));
    }

    public TimetableDTO addTimetable(TimetableDTO timetable){
        return convertEntityToDto(timetableRepository.save(convertDtoToEntity(timetable)));
    }

    public TimetableDTO updateTimetable(TimetableDTO timetable){
        return convertEntityToDto(timetableRepository.save(convertDtoToEntity(timetable)));
    }

    public void deleteTimetable(Long id){
        boolean exist = timetableRepository.existsById(id);
        if(!exist)
            throw new IllegalStateException("Timetable with id " + id + " does not exist.");
        timetableRepository.deleteById(id);
    }

    public TimetableEntity convertDtoToEntity(TimetableDTO dto){
        UserEntity user = userRepository.findById(dto.userId)
                .orElseThrow(() -> new EntityNotFoundException("User by id " + dto.userId + " was not found."));

        return new TimetableEntity(dto.id, dto.name, user);
    }

    public TimetableDTO convertEntityToDto(TimetableEntity entity){
        return new TimetableDTO(entity.getId(), entity.getName(), entity.getUser().getId());
    }
}
