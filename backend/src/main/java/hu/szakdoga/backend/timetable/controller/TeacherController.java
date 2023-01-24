package hu.szakdoga.backend.timetable.controller;


import hu.szakdoga.backend.timetable.data.dto.TeacherDTO;
import hu.szakdoga.backend.timetable.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/teacher")
public class TeacherController {
    private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<TeacherDTO>> getAllTeacher() {
        List<TeacherDTO> teachers = teacherService.findAllTeacher();
        return new ResponseEntity<>(teachers, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<TeacherDTO> getTeacherById(@PathVariable("id") Long id) {
        TeacherDTO teacher = teacherService.findTeacherById(id);
        return new ResponseEntity<>(teacher, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<TeacherDTO> addTeacher(@RequestBody TeacherDTO teacher) {
        TeacherDTO newTeacher = teacherService.addTeacher(teacher);
        return new ResponseEntity<>(newTeacher, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<TeacherDTO> updateTeacher(@RequestBody(required = true) TeacherDTO teacher) {
        TeacherDTO updatedTeacher = teacherService.updateTeacher(teacher);
        return new ResponseEntity<>(updatedTeacher, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable("id") Long id) {
        teacherService.deleteTeacher(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
