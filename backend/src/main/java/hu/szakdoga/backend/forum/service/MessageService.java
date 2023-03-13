package hu.szakdoga.backend.forum.service;

import hu.szakdoga.backend.authentication.data.model.UserEntity;
import hu.szakdoga.backend.authentication.repository.UserRepository;
import hu.szakdoga.backend.forum.data.dto.MessageDTO;
import hu.szakdoga.backend.forum.data.entity.ForumEntity;
import hu.szakdoga.backend.forum.data.entity.MessageEntity;
import hu.szakdoga.backend.forum.repository.ForumRepository;
import hu.szakdoga.backend.forum.repository.MessageRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ForumRepository forumRepository;

    public List<MessageDTO> findAllMessage(){
        return messageRepository.findAll().stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public MessageDTO findMessageById(Long id){
        return convertEntityToDto(messageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Message by id " + id + " was not found.")));
    }

    public List<MessageDTO> findMessagesByForumId(Long userId) {
        return messageRepository.findByForum_Id(userId).stream().map(entity -> convertEntityToDto(entity)).collect(Collectors.toList());
    }

    public MessageDTO addMessage(MessageDTO messageDTO){
        return convertEntityToDto(messageRepository.save(convertDtoToEntity(messageDTO)));
    }

    public MessageDTO updateMessage(MessageDTO messageDTO){
        return convertEntityToDto(messageRepository.save(convertDtoToEntity(messageDTO)));
    }

    public void deleteMessage(Long id){
        boolean exist = messageRepository.existsById(id);
        if(!exist)
            throw new IllegalStateException("Message with id " + id + " does not exist.");
        messageRepository.deleteById(id);
    }

    public MessageEntity convertDtoToEntity(MessageDTO dto){
        UserEntity user = userRepository.findById(dto.userId)
                .orElseThrow(() -> new EntityNotFoundException("User by id " + dto.userId + " was not found."));

        ForumEntity forum = forumRepository.findById(dto.forumId)
                .orElseThrow(() -> new EntityNotFoundException("Forum by id " + dto.forumId + " was not found."));

        return new MessageEntity(dto.id, dto.pinned, dto.content, dto.dateOfUpload, dto.type, user, forum);
    }

    public MessageDTO convertEntityToDto(MessageEntity entity){
        return new MessageDTO(entity.getId(), entity.isPinned(), entity.getContent(),
                entity.getDateOfUpload(), entity.getType(), entity.getUser().getId(), entity.getForum().getId());
    }
}