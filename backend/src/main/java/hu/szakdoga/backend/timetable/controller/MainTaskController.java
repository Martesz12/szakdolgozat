package hu.szakdoga.backend.timetable.controller;

import hu.szakdoga.backend.timetable.data.dto.MainTaskDTO;
import hu.szakdoga.backend.timetable.service.MainTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mainTask")
public class MainTaskController {
    private final MainTaskService mainTaskService;

    @Autowired
    public MainTaskController(MainTaskService mainTaskService) {
        this.mainTaskService = mainTaskService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<MainTaskDTO>> getAllMainTask() {
        List<MainTaskDTO> mainTasks = mainTaskService.findAllMainTask()
                .stream().map(mainTaskService::convertEntityToDto).collect(Collectors.toList());
        return new ResponseEntity<>(mainTasks, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<MainTaskDTO> getMainTaskById(@PathVariable("id") Long id) {
        MainTaskDTO mainTask = mainTaskService.convertEntityToDto(mainTaskService.findMainTaskById(id));
        return new ResponseEntity<>(mainTask, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<MainTaskDTO> addMainTask(@RequestBody MainTaskDTO mainTask) {
        MainTaskDTO newMainTask = mainTaskService.convertEntityToDto(
                mainTaskService.addMainTask(mainTaskService.convertDtoToEntity(mainTask)));
        return new ResponseEntity<>(newMainTask, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<MainTaskDTO> updateMainTask(@RequestBody(required = true) MainTaskDTO mainTask) {
        MainTaskDTO updatedMainTask = mainTaskService.convertEntityToDto(
                mainTaskService.updateMainTask(mainTaskService.convertDtoToEntity(mainTask)));
        return new ResponseEntity<>(updatedMainTask, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMainTask(@PathVariable("id") Long id) {
        mainTaskService.deleteMainTask(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
