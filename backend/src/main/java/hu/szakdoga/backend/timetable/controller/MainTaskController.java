package hu.szakdoga.backend.timetable.controller;

import hu.szakdoga.backend.timetable.data.entity.MainTaskEntity;
import hu.szakdoga.backend.timetable.service.MainTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mainTask")
public class MainTaskController {
    private final MainTaskService mainTaskService;

    @Autowired
    public MainTaskController(MainTaskService mainTaskService) {
        this.mainTaskService = mainTaskService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<MainTaskEntity>> getAllMainTask() {
        List<MainTaskEntity> mainTasks = mainTaskService.findAllMainTask();
        return new ResponseEntity<>(mainTasks, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<MainTaskEntity> getMainTaskById(@PathVariable("id") Long id) {
        MainTaskEntity mainTask = mainTaskService.findMainTaskById(id);
        return new ResponseEntity<>(mainTask, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<MainTaskEntity> addMainTask(@RequestBody MainTaskEntity mainTask) {
        MainTaskEntity newMainTask = mainTaskService.addMainTask(mainTask);
        return new ResponseEntity<>(newMainTask, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<MainTaskEntity> updateMainTask(@RequestBody(required = true) MainTaskEntity mainTask) {
        MainTaskEntity updatedMainTask = mainTaskService.updateMainTask(mainTask);
        return new ResponseEntity<>(updatedMainTask, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMainTask(@PathVariable("id") Long id) {
        mainTaskService.deleteMainTask(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
