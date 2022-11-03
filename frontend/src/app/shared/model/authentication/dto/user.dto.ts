export class UserDto {
  public readonly id: number | null;
  public readonly primaryTimetableId: number;

  constructor(primaryTimetableId: number, id: number | null = null) {
    this.id = id;
    this.primaryTimetableId = primaryTimetableId;
  }
}
