package hu.szakdoga.backend.forum.controller;

import hu.szakdoga.backend.forum.data.dto.ForumDTO;
import hu.szakdoga.backend.forum.service.ForumService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/forum")
@AllArgsConstructor
public class ForumController {
    private final ForumService forumService;

    @GetMapping("/findAll")
    public ResponseEntity<List<ForumDTO>> getAllForum() {
        List<ForumDTO> allForum = forumService.findAllForum();
        return new ResponseEntity<>(allForum, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ForumDTO> getForumById(@PathVariable("id") Long id) {
        ForumDTO forumById = forumService.findForumById(id);
        return new ResponseEntity<>(forumById, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<ForumDTO> addForum(@RequestBody ForumDTO forumDTO) {
        ForumDTO newForum = forumService.addForum(forumDTO);
        return new ResponseEntity<>(newForum, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ForumDTO> updateForum(@RequestBody(required = true) ForumDTO forumDTO) {
        ForumDTO updatedForum = forumService.updateForum(forumDTO);
        return new ResponseEntity<>(updatedForum, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteForum(@PathVariable("id") Long id) {
        forumService.deleteForum(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
