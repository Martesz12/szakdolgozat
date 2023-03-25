import { MessageTypeEnum } from './message-type.enum';

export class MessageDto {
    public readonly id: number | null;
    public readonly pinned: boolean;
    public readonly content: string;
    public readonly dateOfUpload: Date;
    public readonly type: MessageTypeEnum;
    public readonly userId: number;
    public readonly forumId: number;

    constructor(
        pinned: boolean,
        content: string,
        type: MessageTypeEnum,
        dateOfUpload: Date,
        userId: number,
        forumId: number,
        id: number | null = null
    ) {
        this.id = id;
        this.pinned = pinned;
        this.userId = userId;
        this.content = content;
        this.type = type;
        this.forumId = forumId;
        this.dateOfUpload = dateOfUpload;
    }
}
