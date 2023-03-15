export class ForumDto {
    public readonly id: number | null;
    public readonly name: string;
    public readonly universityId: number;
    public readonly majorIds: number[];
    public readonly facultyIds: number[];
    public readonly description: string;
    public readonly approved: boolean;


	constructor(name: string, universityId: number, majorIds: number[], facultyIds: number[], description: string, approved: boolean, id: number | null = null){
        this.id = id;
        this.name = name;
        this.universityId = universityId;
        this.majorIds = majorIds;
        this.description = description;
        this.facultyIds = facultyIds;
        this.approved = approved;
    }
}