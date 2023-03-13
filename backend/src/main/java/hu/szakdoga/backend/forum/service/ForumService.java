package hu.szakdoga.backend.forum.service;

import hu.szakdoga.backend.authentication.data.model.UserEntity;
import hu.szakdoga.backend.authentication.repository.UserRepository;

import hu.szakdoga.backend.forum.data.dto.ForumDTO;
import hu.szakdoga.backend.forum.data.entity.FacultyEntity;
import hu.szakdoga.backend.forum.data.entity.ForumEntity;
import hu.szakdoga.backend.forum.data.entity.MajorEntity;
import hu.szakdoga.backend.forum.data.entity.UniversityEntity;
import hu.szakdoga.backend.forum.repository.FacultyRepository;
import hu.szakdoga.backend.forum.repository.ForumRepository;
import hu.szakdoga.backend.forum.repository.MajorRepository;
import hu.szakdoga.backend.forum.repository.UniversityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ForumService {

    private final ForumRepository forumRepository;
    private final MajorRepository majorRepository;
    private final FacultyRepository facultyRepository;
    private final UniversityRepository universityRepository;

    public List<ForumDTO> findAllForum(){
        return forumRepository.findAll().stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public ForumDTO findForumById(Long id){
        return convertEntityToDto(forumRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Forum by id " + id + " was not found.")));
    }

    public ForumDTO addForum(ForumDTO forumDTO){
        return convertEntityToDto(forumRepository.save(convertDtoToEntity(forumDTO)));
    }

    public ForumDTO updateForum(ForumDTO forumDTO){
        return convertEntityToDto(forumRepository.save(convertDtoToEntity(forumDTO)));
    }

    public void deleteForum(Long id){
        boolean exist = forumRepository.existsById(id);
        if(!exist)
            throw new IllegalStateException("Forum with id " + id + " does not exist.");
        forumRepository.deleteById(id);
    }

    public ForumEntity convertDtoToEntity(ForumDTO dto){
        UniversityEntity university = universityRepository.findById(dto.universityId)
                .orElseThrow(() -> new EntityNotFoundException("University by id " + dto.universityId + " was not found."));

        List<MajorEntity> majorEntities = dto.majorIds.stream()
                .map(id -> majorRepository.findById(id))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());

        List<FacultyEntity> facultyEntities = dto.facultyIds.stream()
                .map(id -> facultyRepository.findById(id))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());

        return new ForumEntity(dto.id, dto.name, dto.description, university, majorEntities, facultyEntities);
    }

    public ForumDTO convertEntityToDto(ForumEntity entity){
        return new ForumDTO(entity.getId(), entity.getName(), entity.getDescription(), entity.getUniversity().getId(),
                entity.getFaculties().stream().map(FacultyEntity::getId).collect(Collectors.toList()),
                entity.getMajors().stream().map(MajorEntity::getId).collect(Collectors.toList()));
    }
}
