package hu.szakdoga.backend.timetable.controller;

import hu.szakdoga.backend.timetable.data.entity.SubTaskEntity;
import hu.szakdoga.backend.timetable.service.SubTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subTask")
public class SubTaskController {
    private final SubTaskService subTaskService;

    @Autowired
    public SubTaskController(SubTaskService subTaskService) {
        this.subTaskService = subTaskService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<SubTaskEntity>> getAllSubTask() {
        List<SubTaskEntity> subTasks = subTaskService.findAllSubTask();
        return new ResponseEntity<>(subTasks, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<SubTaskEntity> getSubTaskById(@PathVariable("id") Long id) {
        SubTaskEntity subTask = subTaskService.findSubTaskById(id);
        return new ResponseEntity<>(subTask, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<SubTaskEntity> addSubTask(@RequestBody SubTaskEntity subTask) {
        SubTaskEntity newSubTask = subTaskService.addSubTask(subTask);
        return new ResponseEntity<>(newSubTask, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<SubTaskEntity> updateSubTask(@RequestBody(required = true) SubTaskEntity subTask) {
        SubTaskEntity updatedSubTask = subTaskService.updateSubTask(subTask);
        return new ResponseEntity<>(updatedSubTask, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSubTask(@PathVariable("id") Long id) {
        subTaskService.deleteSubTask(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
