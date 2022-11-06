export class TimetableSideMenuNode {
    public readonly id: number;
    public readonly name: string;
    public readonly children?: TimetableSideMenuNode[];

    constructor(id: number, name: string, children: TimetableSideMenuNode[]) {
        this.id = id;
        this.name = name;
        this.children = children;
    }
}
