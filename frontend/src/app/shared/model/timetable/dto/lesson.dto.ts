import { Time } from '@angular/common';

export class LessonDto {
    public readonly id: number | null;
    public readonly day: string;
    public readonly startTime: string;
    public readonly endTime: string;
    public readonly location: string;
    public readonly type: string;
    public readonly subjectId: number;
    public readonly timetableId: number;
    public readonly teacherId: number;

    constructor(
        day: string,
        startTime: string,
        endTime: string,
        location: string,
        type: string,
        subjectId: number,
        timetableId: number,
        teacherId: number,
        id: number | null = null
    ) {
        this.id = id;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.type = type;
        this.subjectId = subjectId;
        this.timetableId = timetableId;
        this.teacherId = teacherId;
    }
}
