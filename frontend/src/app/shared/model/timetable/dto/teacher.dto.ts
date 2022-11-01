export class TeacherDto {
  public readonly id: number;
  public readonly name: string;
  public readonly webpage: string;
  public readonly email: string;
  public readonly userId: number;

  constructor(
    id: number,
    name: string,
    webpage: string,
    email: string,
    userId: number
  ) {
    this.id = id;
    this.name = name;
    this.webpage = webpage;
    this.email = email;
    this.userId = userId;
  }
}
