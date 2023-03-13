package hu.szakdoga.backend.forum.service;

import hu.szakdoga.backend.forum.data.dto.MajorDTO;
import hu.szakdoga.backend.forum.data.entity.MajorEntity;
import hu.szakdoga.backend.forum.repository.MajorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MajorService {
    private final MajorRepository majorRepository;

    public List<MajorDTO> findAllMajor() {
        return majorRepository.findAll().stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public MajorDTO convertEntityToDto(MajorEntity entity) {
        return new MajorDTO(entity.getId(), entity.getName(), entity.getAbbreviation());
    }
}
