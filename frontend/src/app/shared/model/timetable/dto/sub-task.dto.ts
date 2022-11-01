export class SubTaskDto {
  public readonly id: number;
  public readonly name: string;
  public readonly fulfilled: boolean;
  public readonly mainTaskId: number;

  constructor(id: number, name: string, fulfilled: boolean, mainTaskId: number){
    this.id = id;
    this.name = name;
    this.fulfilled = fulfilled;
    this.mainTaskId = mainTaskId;
  };
}
