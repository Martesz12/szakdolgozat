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
                    url: 'timetable-daily',
                },
                {
                    id: 12,
                    name: 'Heti nézet',
                    url: 'timetable-weekly',
                },
            ],
            url: '',
        },
        {
            id: 2,
            name: 'Tanrend',
            children: [
                {
                    id: 21,
                    name: 'Tantárgyak',
                    url: 'subject',
                },
                {
                    id: 22,
                    name: 'Tanárok',
                    url: 'teacher',
                },
                {
                    id: 23,
                    name: 'Tanórák',
                    url: 'lesson',
                },
            ],
            url: '',
        },
        {
            id: 3,
            name: 'Feladatok',
            children: [
                {
                    id: 31,
                    name: 'Lista nézet',
                    url: 'agenda-list',
                },
                {
                    id: 32,
                    name: 'Havi nézet',
                    url: 'agenda-monthly',
                },
            ],
            url: '',
        },
    ];
}
