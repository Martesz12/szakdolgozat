package hu.szakdoga.backend.authentication.controller;

import hu.szakdoga.backend.authentication.data.dto.UserDTO;
import hu.szakdoga.backend.authentication.data.model.UserEntity;
import hu.szakdoga.backend.authentication.service.UserService;
import hu.szakdoga.backend.forum.data.dto.ForumDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/findUsersByIds")
    public ResponseEntity<List<UserDTO>> getAllFaculty(@RequestBody List<Long> userIds) {
        List<UserDTO> users = userService.findUsersByIds(userIds);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
