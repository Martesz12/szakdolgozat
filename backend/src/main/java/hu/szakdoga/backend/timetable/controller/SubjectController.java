package hu.szakdoga.backend.timetable.controller;

import hu.szakdoga.backend.timetable.data.dto.SubjectDTO;
import hu.szakdoga.backend.timetable.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/subject")
public class SubjectController {
    private final SubjectService subjectService;

    @Autowired
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<SubjectDTO>> getAllSubject() {
        List<SubjectDTO> subjects = subjectService.findAllSubject();
        return new ResponseEntity<>(subjects, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<SubjectDTO> getSubjectById(@PathVariable("id") Long id) {
        SubjectDTO subject = subjectService.findSubjectById(id);
        return new ResponseEntity<>(subject, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<SubjectDTO> addSubject(@RequestBody SubjectDTO subject) {
        SubjectDTO newSubject = subjectService.addSubject(subject);
        return new ResponseEntity<>(newSubject, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<SubjectDTO> updateSubject(@RequestBody(required = true) SubjectDTO subject) {
        SubjectDTO updatedSubject = subjectService.updateSubject(subject);
        return new ResponseEntity<>(updatedSubject, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable("id") Long id) {
        subjectService.deleteSubject(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
