package hu.szakdoga.backend.timetable.service;


import hu.szakdoga.backend.authentication.data.model.UserEntity;
import hu.szakdoga.backend.authentication.repository.UserRepository;
import hu.szakdoga.backend.timetable.data.dto.SubjectDTO;
import hu.szakdoga.backend.timetable.data.entity.SubjectEntity;
import hu.szakdoga.backend.timetable.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;

    @Autowired
    public SubjectService(SubjectRepository subjectRepository, UserRepository userRepository){
        this.subjectRepository = subjectRepository;
        this.userRepository = userRepository;
    }

    public List<SubjectDTO> findAllSubject(){
        return subjectRepository.findAll().stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public SubjectDTO findSubjectById(Long id){
        return convertEntityToDto(subjectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subject by id " + id + " was not found.")));
    }

    public List<SubjectDTO> findSubjectsByUserId(Long userId) {
        return subjectRepository.findByUser_Id(userId).stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public SubjectDTO addSubject(SubjectDTO subject){
        return convertEntityToDto(subjectRepository.save(convertDtoToEntity(subject)));
    }

    public SubjectDTO updateSubject(SubjectDTO subject){
        return convertEntityToDto(subjectRepository.save(convertDtoToEntity(subject)));
    }

    public void deleteSubject(Long id){
        boolean exist = subjectRepository.existsById(id);
        if(!exist)
            throw new IllegalStateException("Subject with id " + id + " does not exist.");
        subjectRepository.deleteById(id);
    }

    public SubjectEntity convertDtoToEntity(SubjectDTO dto) {
        UserEntity user = userRepository.findById(dto.userId)
                .orElseThrow(() -> new EntityNotFoundException("User by id " + dto.userId + " was not found."));

        return new SubjectEntity(dto.id,
                dto.name,
                dto.abbreviation,
                dto.color,
                dto.requirement,
                user);
    }

    public SubjectDTO convertEntityToDto(SubjectEntity entity){
        return new SubjectDTO(entity.getId(), entity.getName(), entity.getAbbreviation(),
                entity.getColor(), entity.getRequirement(), entity.getUser().getId());
    }
}
