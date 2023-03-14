export class MajorDto {
    public readonly id: number | null;
    public readonly name: string;
    public readonly abbreviation: string;


	constructor(name: string, abbreviation: string, id: number | null = null){
        this.id = id;
        this.name = name;
        this.abbreviation = abbreviation;
    }
}