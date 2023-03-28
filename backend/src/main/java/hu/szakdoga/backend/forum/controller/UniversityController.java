package hu.szakdoga.backend.forum.controller;

import hu.szakdoga.backend.forum.data.dto.UniversityDTO;
import hu.szakdoga.backend.forum.service.UniversityService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/university")
@AllArgsConstructor
public class UniversityController {
    private final UniversityService universityService;

    @GetMapping("/findAll")
    public ResponseEntity<List<UniversityDTO>> getAllUniversity() {
        List<UniversityDTO> majors = universityService.findAllUniversity();
        return new ResponseEntity<>(majors, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<UniversityDTO> getUniversityById(@PathVariable("id") Long id) {
        UniversityDTO forumById = universityService.findUniversityById(id);
        return new ResponseEntity<>(forumById, HttpStatus.OK);
    }
}
