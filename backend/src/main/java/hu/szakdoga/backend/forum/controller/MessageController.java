package hu.szakdoga.backend.forum.controller;

import hu.szakdoga.backend.forum.data.dto.MessageDTO;
import hu.szakdoga.backend.forum.service.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
@AllArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @GetMapping("/findAll")
    public ResponseEntity<List<MessageDTO>> getAllMessage() {
        List<MessageDTO> allMessage = messageService.findAllMessage();
        return new ResponseEntity<>(allMessage, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<MessageDTO> getMessageById(@PathVariable("id") Long id) {
        MessageDTO messageById = messageService.findMessageById(id);
        return new ResponseEntity<>(messageById, HttpStatus.OK);
    }

    @GetMapping("/findByUserId/{forumId}")
    public ResponseEntity<List<MessageDTO>> getLessonsByUserIdAndTimetableId(@PathVariable("forumId") Long forumId) {
        List<MessageDTO> messagesByForumId = messageService.findMessagesByForumId(forumId);
        return new ResponseEntity<>(messagesByForumId, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<MessageDTO> addMessage(@RequestBody MessageDTO messageDTO) {
        MessageDTO newMessage = messageService.addMessage(messageDTO);
        return new ResponseEntity<>(newMessage, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<MessageDTO> updateMessage(@RequestBody(required = true) MessageDTO messageDTO) {
        MessageDTO updatedMessage = messageService.updateMessage(messageDTO);
        return new ResponseEntity<>(updatedMessage, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable("id") Long id) {
        messageService.deleteMessage(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
