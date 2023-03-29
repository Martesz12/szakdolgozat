package hu.szakdoga.backend.forum.controller;

import hu.szakdoga.backend.forum.service.FilesStorageService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

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
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        //TODO ellenőrizni a mediatype típusokra
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .contentType(MediaType.TEXT_PLAIN)
                .body(file);
    }

    @GetMapping("/getImage/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IllegalAccessException {
        String fileType = filename.split("\\.")[1];
        MediaType mediaType = null;
        if(Objects.equals(fileType, "png")) mediaType = MediaType.IMAGE_PNG;
        else if(Objects.equals(fileType, "jpeg") || Objects.equals(fileType, "jpg")) mediaType = MediaType.IMAGE_JPEG;
        else if(Objects.equals(fileType, "gif")) mediaType = MediaType.IMAGE_GIF;
        if(mediaType == null) throw new IllegalAccessException("A fájl nem kép");
        Resource file = storageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .contentType(mediaType)
                .body(file);
    }
}
