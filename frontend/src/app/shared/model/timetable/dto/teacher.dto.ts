export class TeacherDto {
    public readonly id: number | null;
    public readonly name: string;
    public readonly webpage: string;
    public readonly email: string;
    public readonly userId: number;
    public readonly office: string;
    public readonly moreInformation: string;

    constructor(name: string, webpage: string, email: string, userId: number, office: string, moreInformation: string, id: number | null = null) {
        this.id = id;
        this.name = name;
        this.webpage = webpage;
        this.email = email;
        this.userId = userId;
        this.office = office;
        this.moreInformation = moreInformation;
    }
}
