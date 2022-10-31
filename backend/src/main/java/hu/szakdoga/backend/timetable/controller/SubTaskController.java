package hu.szakdoga.backend.timetable.controller;

import hu.szakdoga.backend.timetable.data.dto.SubTaskDTO;
import hu.szakdoga.backend.timetable.service.SubTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/subTask")
public class SubTaskController {
    private final SubTaskService subTaskService;

    @Autowired
    public SubTaskController(SubTaskService subTaskService) {
        this.subTaskService = subTaskService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<SubTaskDTO>> getAllSubTask() {
        List<SubTaskDTO> subTasks = subTaskService.findAllSubTask()
                .stream().map(subTaskService::convertEntityToDto).collect(Collectors.toList());
        return new ResponseEntity<>(subTasks, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<SubTaskDTO> getSubTaskById(@PathVariable("id") Long id) {
        SubTaskDTO subTask = subTaskService.convertEntityToDto(subTaskService.findSubTaskById(id));
        return new ResponseEntity<>(subTask, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<SubTaskDTO> addSubTask(@RequestBody SubTaskDTO subTask) {
        SubTaskDTO newSubTask = subTaskService.convertEntityToDto(
                subTaskService.addSubTask(subTaskService.convertDtoToEntity(subTask)));
        return new ResponseEntity<>(newSubTask, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<SubTaskDTO> updateSubTask(@RequestBody(required = true) SubTaskDTO subTask) {
        SubTaskDTO updatedSubTask = subTaskService.convertEntityToDto(
                subTaskService.updateSubTask(subTaskService.convertDtoToEntity(subTask)));
        return new ResponseEntity<>(updatedSubTask, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSubTask(@PathVariable("id") Long id) {
        subTaskService.deleteSubTask(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
