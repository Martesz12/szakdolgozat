export class FacultyDto {
    public readonly id: number | null;
    public readonly name: string;
    public readonly universityId: number;
    public readonly majorIds: number[];
    public readonly abbreviation: string;


	constructor(name: string, universityId: number, majorIds: number[], abbreviation: string, id: number | null = null){
        this.id = id;
        this.name = name;
        this.universityId = universityId;
        this.majorIds = majorIds;
        this.abbreviation = abbreviation;
    }
}