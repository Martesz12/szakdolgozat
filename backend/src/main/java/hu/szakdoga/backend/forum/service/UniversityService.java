package hu.szakdoga.backend.forum.service;

import hu.szakdoga.backend.forum.data.dto.UniversityDTO;
import hu.szakdoga.backend.forum.data.entity.UniversityEntity;
import hu.szakdoga.backend.forum.repository.UniversityRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UniversityService {
    private final UniversityRepository universityRepository;

    public List<UniversityDTO> findAllUniversity() {
        return universityRepository.findAll().stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public UniversityDTO findUniversityById(Long id){
        return convertEntityToDto(universityRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("University by id " + id + " was not found.")));
    }

    public UniversityDTO convertEntityToDto(UniversityEntity entity) {
        return new UniversityDTO(entity.getId(), entity.getName(), entity.getAbbreviation());
    }
}
