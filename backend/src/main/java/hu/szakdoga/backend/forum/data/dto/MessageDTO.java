package hu.szakdoga.backend.forum.data.dto;

import hu.szakdoga.backend.authentication.data.model.UserEntity;
import hu.szakdoga.backend.forum.data.MessageTypeEnum;

import java.util.Date;

public class MessageDTO {
    public final Long id;
    public final boolean pinned;
    public final String content;
    public final Date dateOfUpload;
    public final MessageTypeEnum type;
    public final Long userId;
    public final Long forumId;

    public MessageDTO(Long id, boolean pinned, String content, Date dateOfUpload, MessageTypeEnum type, Long userId, Long forumId) {
        this.id = id;
        this.pinned = pinned;
        this.content = content;
        this.dateOfUpload = dateOfUpload;
        this.type = type;
        this.userId = userId;
        this.forumId = forumId;
    }
}
