package hu.szakdoga.backend.timetable.controller;


import hu.szakdoga.backend.timetable.data.dto.TimetableDTO;
import hu.szakdoga.backend.timetable.service.TimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/timetable")
public class TimetableController {
    private final TimetableService timetableService;

    @Autowired
    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<TimetableDTO>> getAllTimetable() {
        List<TimetableDTO> timetables = timetableService.findAllTimetable();
        return new ResponseEntity<>(timetables, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<TimetableDTO> getTimetableById(@PathVariable("id") Long id) {
        TimetableDTO timetable = timetableService.findTimetableById(id);
        return new ResponseEntity<>(timetable, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<TimetableDTO> addTimetable(@RequestBody TimetableDTO timetable) {
        TimetableDTO newTimetable = timetableService.addTimetable(timetable);
        return new ResponseEntity<>(newTimetable, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<TimetableDTO> updateTimetable(@RequestBody(required = true) TimetableDTO timetable) {
        TimetableDTO updatedTimetable = timetableService.updateTimetable(timetable);
        return new ResponseEntity<>(updatedTimetable, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTimetable(@PathVariable("id") Long id) {
        timetableService.deleteTimetable(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
