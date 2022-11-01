export class MainTaskDto {
  public readonly id: number;
  public readonly name: string;
  public readonly fulfilled: boolean;
  public readonly deadline: Date;
  public readonly note: string;
  public readonly type: string;
  public readonly lessonId: number;

  constructor(
    id: number,
    name: string,
    fulfilled: boolean,
    deadline: Date,
    note: string,
    type: string,
    lessonId: number
  ) {
    this.id = id;
    this.name = name;
    this.fulfilled = fulfilled;
    this.deadline = deadline;
    this.note = note;
    this.type = type;
    this.lessonId = lessonId;
  }
}
