export class TimetableDto {
    public readonly id: number | null;
    public readonly name: string;
    public readonly userId: number;

    constructor(name: string, userId: number, id: number | null = null) {
        this.id = id;
        this.name = name;
        this.userId = userId;
    }
}
