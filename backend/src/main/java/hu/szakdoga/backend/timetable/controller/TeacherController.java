package hu.szakdoga.backend.timetable.controller;

import hu.szakdoga.backend.timetable.data.entity.TeacherEntity;
import hu.szakdoga.backend.timetable.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher")
public class TeacherController {
    private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<TeacherEntity>> getAllTeacher() {
        List<TeacherEntity> teachers = teacherService.findAllTeacher();
        return new ResponseEntity<>(teachers, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<TeacherEntity> getTeacherById(@PathVariable("id") Long id) {
        TeacherEntity teacher = teacherService.findTeacherById(id);
        return new ResponseEntity<>(teacher, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<TeacherEntity> addTeacher(@RequestBody TeacherEntity teacher) {
        TeacherEntity newTeacher = teacherService.addTeacher(teacher);
        return new ResponseEntity<>(newTeacher, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<TeacherEntity> updateTeacher(@RequestBody(required = true) TeacherEntity teacher) {
        TeacherEntity updatedTeacher = teacherService.updateTeacher(teacher);
        return new ResponseEntity<>(updatedTeacher, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable("id") Long id) {
        teacherService.deleteTeacher(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
