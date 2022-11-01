export class UserDto {
    public readonly id: number;
    public readonly primaryTimetableId: number;

    constructor(id: number, primaryTimetableId: number){
        this.id = id;
        this.primaryTimetableId = primaryTimetableId;
    }
}