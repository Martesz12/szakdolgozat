package hu.szakdoga.backend.timetable.controller;

import hu.szakdoga.backend.timetable.data.entity.TimetableEntity;
import hu.szakdoga.backend.timetable.service.TimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/timetable")
public class TimetableController {
    private final TimetableService timetableService;

    @Autowired
    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<TimetableEntity>> getAllTimetable() {
        List<TimetableEntity> timetables = timetableService.findAllTimetable();
        return new ResponseEntity<>(timetables, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<TimetableEntity> getTimetableById(@PathVariable("id") Long id) {
        TimetableEntity timetable = timetableService.findTimetableById(id);
        return new ResponseEntity<>(timetable, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<TimetableEntity> addTimetable(@RequestBody TimetableEntity timetable) {
        TimetableEntity newTimetable = timetableService.addTimetable(timetable);
        return new ResponseEntity<>(newTimetable, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<TimetableEntity> updateTimetable(@RequestBody(required = true) TimetableEntity timetable) {
        TimetableEntity updatedTimetable = timetableService.updateTimetable(timetable);
        return new ResponseEntity<>(updatedTimetable, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTimetable(@PathVariable("id") Long id) {
        timetableService.deleteTimetable(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
