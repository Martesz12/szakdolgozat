package hu.szakdoga.backend.timetable.controller;

import hu.szakdoga.backend.timetable.data.entity.SubjectEntity;
import hu.szakdoga.backend.timetable.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subject")
public class SubjectController {
    private final SubjectService subjectService;

    @Autowired
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<SubjectEntity>> getAllSubject() {
        List<SubjectEntity> subjects = subjectService.findAllSubject();
        return new ResponseEntity<>(subjects, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<SubjectEntity> getSubjectById(@PathVariable("id") Long id) {
        SubjectEntity subject = subjectService.findSubjectById(id);
        return new ResponseEntity<>(subject, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<SubjectEntity> addSubject(@RequestBody SubjectEntity subject) {
        SubjectEntity newSubject = subjectService.addSubject(subject);
        return new ResponseEntity<>(newSubject, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<SubjectEntity> updateSubject(@RequestBody(required = true) SubjectEntity subject) {
        SubjectEntity updatedSubject = subjectService.updateSubject(subject);
        return new ResponseEntity<>(updatedSubject, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable("id") Long id) {
        subjectService.deleteSubject(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
