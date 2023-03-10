export class TimetableSideMenuNode {
    public readonly id: number;
    public readonly name: string;
    public readonly url: string;
    public readonly children?: TimetableSideMenuNode[];

    constructor(id: number, name: string, children: TimetableSideMenuNode[], url: string) {
        this.id = id;
        this.name = name;
        this.children = children;
        this.url = url;
    }
}
