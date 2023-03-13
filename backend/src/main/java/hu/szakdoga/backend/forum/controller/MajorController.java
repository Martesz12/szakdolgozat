package hu.szakdoga.backend.forum.controller;

import hu.szakdoga.backend.forum.data.dto.MajorDTO;
import hu.szakdoga.backend.forum.service.MajorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/major")
@AllArgsConstructor
public class MajorController {
    private final MajorService majorService;

    @GetMapping("/findAll")
    public ResponseEntity<List<MajorDTO>> getAllMajor() {
        List<MajorDTO> majors = majorService.findAllMajor();
        return new ResponseEntity<>(majors, HttpStatus.OK);
    }
}
