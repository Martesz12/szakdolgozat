package hu.szakdoga.backend.timetable.controller;

import hu.szakdoga.backend.timetable.data.dto.LessonDTO;
import hu.szakdoga.backend.timetable.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lesson")
public class LessonController {
    private final LessonService lessonService;

    @Autowired
    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<LessonDTO>> getAllLesson() {
        List<LessonDTO> lessons = lessonService.findAllLessons();
        return new ResponseEntity<>(lessons, HttpStatus.OK);
    }

    @GetMapping("/findByTimetableId/{timetableId}")
    public ResponseEntity<List<LessonDTO>> getLessonsByUserIdAndTimetableId(@PathVariable("timetableId") Long timetableId) {
        List<LessonDTO> lessons = lessonService.getLessonsByTimetableId(timetableId);
        return new ResponseEntity<>(lessons, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<LessonDTO> getLessonById(@PathVariable("id") Long id) {
        LessonDTO lesson = lessonService.findLessonById(id);
        return new ResponseEntity<>(lesson, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<LessonDTO> addLesson(@RequestBody LessonDTO lesson) {
        LessonDTO newLesson = lessonService.addLesson(lesson);
        return new ResponseEntity<>(newLesson, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<LessonDTO> updateLesson(@RequestBody(required = true) LessonDTO lesson) {
        LessonDTO updatedLesson = lessonService.updateLesson(lesson);
        return new ResponseEntity<>(updatedLesson, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteLesson(@PathVariable("id") Long id) {
        lessonService.deleteLesson(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
