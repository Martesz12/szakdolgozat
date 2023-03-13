package hu.szakdoga.backend.forum.controller;

import hu.szakdoga.backend.forum.data.dto.FacultyDTO;
import hu.szakdoga.backend.forum.service.FacultyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/faculty")
@AllArgsConstructor
public class FacultyController {
    private final FacultyService facultyService;

    @GetMapping("/findAll")
    public ResponseEntity<List<FacultyDTO>> getAllFaculty() {
        List<FacultyDTO> faculties = facultyService.findAllFaculty();
        return new ResponseEntity<>(faculties, HttpStatus.OK);
    }
}
