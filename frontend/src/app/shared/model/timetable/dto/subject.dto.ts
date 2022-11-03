export class SubjectDto {
  public readonly id: number | null;
  public readonly name: string;
  public readonly abbreviation: string;
  public readonly color: string;
  public readonly requirement: string;
  public readonly userId: number;

  constructor(
    name: string,
    abbreviation: string,
    color: string,
    requirement: string,
    userId: number,
    id: number | null = null,
  ){
    this.id = id;
    this.name = name;
    this.abbreviation = abbreviation;
    this.color = color;
    this.requirement = requirement;
    this.userId = userId;
  };
}
