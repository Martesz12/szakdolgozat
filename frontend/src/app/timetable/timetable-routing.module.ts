import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaListViewComponent } from './component/agenda-list-view/agenda-list-view.component';
import { AgendaMonthlyViewComponent } from './component/agenda-monthly-view/agenda-monthly-view.component';
import { LessonViewComponent } from './component/lesson-view/lesson-view.component';
import { SubjectViewComponent } from './component/subject-view/subject-view.component';
import { TeacherViewComponent } from './component/teacher-view/teacher-view.component';
import { TimetableDailyViewComponent } from './component/timetable-daily-view/timetable-daily-view.component';
import { TimetableWeeklyViewComponent } from './component/timetable-weekly-view/timetable-weekly-view.component';

const routes: Routes = [
    {
        path: 'timetable-weekly',
        component: TimetableWeeklyViewComponent,
    },
    {
        path: 'timetable-daily',
        component: TimetableDailyViewComponent,
    },
    {
        path: 'subject',
        component: SubjectViewComponent,
    },
    {
        path: 'teacher',
        component: TeacherViewComponent,
    },
    {
        path: 'lesson',
        component: LessonViewComponent,
    },
    {
        path: 'agenda-list',
        component: AgendaListViewComponent,
    },
    {
        path: 'agenda-monthly',
        component: AgendaMonthlyViewComponent,
    },
    {
        path: '',
        redirectTo: 'timetable-weekly',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TimetableRoutingModule {}
