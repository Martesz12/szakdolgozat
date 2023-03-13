package hu.szakdoga.backend.forum.service;

import hu.szakdoga.backend.forum.data.dto.FacultyDTO;
import hu.szakdoga.backend.forum.data.entity.FacultyEntity;
import hu.szakdoga.backend.forum.data.entity.MajorEntity;
import hu.szakdoga.backend.forum.repository.FacultyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FacultyService {
    private final FacultyRepository facultyRepository;

    public List<FacultyDTO> findAllFaculty() {
        return facultyRepository.findAll().stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public FacultyDTO convertEntityToDto(FacultyEntity entity) {
        return new FacultyDTO(entity.getId(), entity.getName(),
                entity.getUniversity().getId(),
                entity.getMajors().stream().map(MajorEntity::getId).collect(Collectors.toList()),
                entity.getAbbreviation());
    }
}
