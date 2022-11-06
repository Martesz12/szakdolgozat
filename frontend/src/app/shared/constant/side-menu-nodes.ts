import { TimetableSideMenuNode } from '../model/timetable/timetable-side-menu-node';

export class SideMenuNodes {
    static readonly TimetableSideMenuNodes: TimetableSideMenuNode[] = [
        {
            id: 1,
            name: 'Órarend',
            children: [
                {
                    id: 11,
                    name: 'Napi nézet',
                },
                {
                    id: 12,
                    name: 'Heti nézet',
                },
            ],
        },
        {
            id: 2,
            name: 'Tanrend',
            children: [
                {
                    id: 21,
                    name: 'Tantárgyak',
                },
                {
                    id: 22,
                    name: 'Tanárok',
                },
                {
                    id: 23,
                    name: 'Tanórák',
                },
            ],
        },
        {
            id: 3,
            name: 'Napirend',
            children: [
                {
                    id: 31,
                    name: 'Lista nézet',
                },
                {
                    id: 32,
                    name: 'Havi nézet',
                },
            ],
        },
    ];
}
