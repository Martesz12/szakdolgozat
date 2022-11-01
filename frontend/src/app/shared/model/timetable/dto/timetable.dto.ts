export class TimetableDto {
    public readonly id: number;
    public readonly name: string;
    public readonly userId: number;

    constructor(id: number, name: string, userId: number){
        this.id = id;
        this.name = name;
        this.userId = userId;
    }
}