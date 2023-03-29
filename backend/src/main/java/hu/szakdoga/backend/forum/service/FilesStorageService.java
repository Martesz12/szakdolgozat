package hu.szakdoga.backend.forum.service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.stream.Stream;

@Service
public class FilesStorageService {

    private final Path root = Paths.get("uploads");

    public void init() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    public void save(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

    public MediaType checkIfFileImage(String filename) {
        String fileType = filename.split("\\.")[1];
        if(Objects.equals(fileType, "png")) return MediaType.IMAGE_PNG;
        else if(Objects.equals(fileType, "jpeg") || Objects.equals(fileType, "jpg")) return MediaType.IMAGE_JPEG;
        else if(Objects.equals(fileType, "gif")) return MediaType.IMAGE_GIF;
        else return null;
    }

    public MediaType checkFileType(String filename) {
        String fileType = filename.split("\\.")[1];
        if(Objects.equals(fileType, "png")) return MediaType.IMAGE_PNG;
        else if(Objects.equals(fileType, "jpeg") || Objects.equals(fileType, "jpg")) return MediaType.IMAGE_JPEG;
        else if(Objects.equals(fileType, "gif")) return MediaType.IMAGE_GIF;
        else if(Objects.equals(fileType, "pdf")) return MediaType.APPLICATION_PDF;
        else return MediaType.TEXT_PLAIN;
    }
}
