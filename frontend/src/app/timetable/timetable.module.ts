import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetableRoutingModule } from './timetable-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TimetableWeeklyViewComponent } from './component/timetable-weekly-view/timetable-weekly-view.component';
import { TimetableDailyViewComponent } from './component/timetable-daily-view/timetable-daily-view.component';
import { SubjectViewComponent } from './component/subject-view/subject-view.component';
import { TeacherViewComponent } from './component/teacher-view/teacher-view.component';
import { LessonViewComponent } from './component/lesson-view/lesson-view.component';
import { AgendaListViewComponent } from './component/agenda-list-view/agenda-list-view.component';
import { AgendaMonthlyViewComponent } from './component/agenda-monthly-view/agenda-monthly-view.component';
import { TeacherListComponent } from './component/teacher-view/teacher-list/teacher-list.component';
import { TeacherDataOperationsComponent } from './component/teacher-view/teacher-data-operations/teacher-data-operations.component';
import { TeacherDataOperationsNavigationComponent } from './component/teacher-view/teacher-data-operations/teacher-data-operations-navigation/teacher-data-operations-navigation.component';
import { TeacherDataOperationsDescriptionComponent } from './component/teacher-view/teacher-data-operations/teacher-data-operations-description/teacher-data-operations-description.component';
import { TeacherDataOperationsSaveFormComponent } from './component/teacher-view/teacher-data-operations/teacher-data-operations-save-form/teacher-data-operations-save-form.component';
import { SubjectListComponent } from './component/subject-view/subject-list/subject-list.component';
import { SubjectDataOperationsComponent } from './component/subject-view/subject-data-operations/subject-data-operations.component';
import { SubjectDataOperationsSaveFormComponent } from './component/subject-view/subject-data-operations/subject-data-operations-save-form/subject-data-operations-save-form.component';
import { SubjectDataOperationsNavigationComponent } from './component/subject-view/subject-data-operations/subject-data-operations-navigation/subject-data-operations-navigation.component';
import { SubjectDataOperationsDescriptionComponent } from './component/subject-view/subject-data-operations/subject-data-operations-description/subject-data-operations-description.component';

@NgModule({
    declarations: [
        TimetableWeeklyViewComponent,
        TimetableDailyViewComponent,
        SubjectViewComponent,
        TeacherViewComponent,
        LessonViewComponent,
        AgendaListViewComponent,
        AgendaMonthlyViewComponent,
        TeacherListComponent,
        TeacherDataOperationsComponent,
        TeacherDataOperationsNavigationComponent,
        TeacherDataOperationsDescriptionComponent,
        TeacherDataOperationsSaveFormComponent,
        SubjectListComponent,
        SubjectDataOperationsComponent,
        SubjectDataOperationsSaveFormComponent,
        SubjectDataOperationsNavigationComponent,
        SubjectDataOperationsDescriptionComponent,
    ],
    imports: [CommonModule, TimetableRoutingModule, SharedModule],
    providers: [],
})
export class TimetableModule {}
