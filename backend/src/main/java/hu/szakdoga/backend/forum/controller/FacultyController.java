package hu.szakdoga.backend.forum.controller;

import hu.szakdoga.backend.forum.data.dto.FacultyDTO;
import hu.szakdoga.backend.forum.service.FacultyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/findFacultiesByIds")
    public ResponseEntity<List<FacultyDTO>> getAllFaculty(@RequestBody List<Long> userIds) {
        List<FacultyDTO> users = facultyService.findFacultiesByIds(userIds);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
