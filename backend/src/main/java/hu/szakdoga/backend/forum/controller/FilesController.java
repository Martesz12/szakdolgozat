package hu.szakdoga.backend.forum.controller;

import hu.szakdoga.backend.forum.service.FilesStorageService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file")
@AllArgsConstructor
public class FilesController {

    private final FilesStorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        storageService.save(file);
        return new ResponseEntity<>(HttpStatus.OK);
//        String message = "";
//        try {
//            storageService.save(file);
//            return new ResponseEntity<>(HttpStatus.OK);
//        } catch (Exception e) {
//            message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
//            return new ResponseEntity<>(message, HttpStatus.EXPECTATION_FAILED);
//        }
    }

    @GetMapping("/get/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        return new ResponseEntity<>(file, HttpStatus.OK);
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}
