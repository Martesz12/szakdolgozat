package hu.szakdoga.backend.timetable.service;


import hu.szakdoga.backend.timetable.data.entity.SubjectEntity;
import hu.szakdoga.backend.timetable.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectService(SubjectRepository subjectRepository){
        this.subjectRepository = subjectRepository;
    }

    public SubjectEntity addSubject(SubjectEntity subject){
        return subjectRepository.save(subject);
    }

    public List<SubjectEntity> findAllSubject(){
        return subjectRepository.findAll();
    }

    public SubjectEntity findSubjectById(Long id){
        return subjectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subject by id " + id + " was not found."));
    }

    public SubjectEntity updateSubject(SubjectEntity subject){
        return subjectRepository.save(subject);
    }

    public void deleteSubject(Long id){
        boolean exist = subjectRepository.existsById(id);
        if(!exist)
            throw new IllegalStateException("Subject with id " + id + " does not exist.");
        subjectRepository.deleteById(id);
    }
}