import { MessageTypeEnum } from "./message-type.enum";

export class MessageDto {
    public readonly id: number | null;
    public readonly pinned: boolean;
    public readonly content: string;
    public readonly type: MessageTypeEnum;
    public readonly universityId: number;
    public readonly forumId: number;
    


	constructor(pinned: boolean, content: string, type: MessageTypeEnum, universityId: number, forumId: number, id: number | null = null){
        this.id = id;
        this.pinned = pinned;
        this.universityId = universityId;
        this.content = content;
        this.type = type;
        this.forumId = forumId;
    }
}