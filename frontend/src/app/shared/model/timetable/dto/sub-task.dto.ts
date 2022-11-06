export class SubTaskDto {
    public readonly id: number | null;
    public readonly name: string;
    public readonly fulfilled: boolean;
    public readonly mainTaskId: number;

    constructor(name: string, fulfilled: boolean, mainTaskId: number, id: number | null = null) {
        this.id = id;
        this.name = name;
        this.fulfilled = fulfilled;
        this.mainTaskId = mainTaskId;
    }
}
