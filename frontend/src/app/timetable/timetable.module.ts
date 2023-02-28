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
import { SubjectDataOperationsUpdateFormComponent } from './component/subject-view/subject-data-operations/subject-data-operations-update-form/subject-data-operations-update-form.component';
import { TeacherDataOperationsUpdateFormComponent } from './component/teacher-view/teacher-data-operations/teacher-data-operations-update-form/teacher-data-operations-update-form.component';
import { LessonListComponent } from './component/lesson-view/lesson-list/lesson-list.component';
import { LessonDataOperationsComponent } from './component/lesson-view/lesson-data-operations/lesson-data-operations.component';
import { LessonDataOperationsDescriptionComponent } from './component/lesson-view/lesson-data-operations/lesson-data-operations-description/lesson-data-operations-description.component';
import { LessonDataOperationsNavigationComponent } from './component/lesson-view/lesson-data-operations/lesson-data-operations-navigation/lesson-data-operations-navigation.component';
import { LessonDataOperationsSaveFormComponent } from './component/lesson-view/lesson-data-operations/lesson-data-operations-save-form/lesson-data-operations-save-form.component';
import { LessonDataOperationsUpdateFormComponent } from './component/lesson-view/lesson-data-operations/lesson-data-operations-update-form/lesson-data-operations-update-form.component';
import { TimetableDialogComponent } from './component/timetable-side-menu/timetable-dialog/timetable-dialog.component';
import { TimetableDailyViewListComponent } from './component/timetable-daily-view/timetable-daily-view-list/timetable-daily-view-list.component';
import { TimetableDailyViewDescriptionComponent } from './component/timetable-daily-view/timetable-daily-view-description/timetable-daily-view-description.component';
import { AgendaListViewListComponent } from './component/agenda-list-view/agenda-list-view-list/agenda-list-view-list.component';
import { AgendaListViewDataOperationsComponent } from './component/agenda-list-view/agenda-list-view-data-operations/agenda-list-view-data-operations.component';
import { TaskDataOperationsDescriptionComponent } from './component/agenda-list-view/agenda-list-view-data-operations/task-data-operations-description/task-data-operations-description.component';
import { TaskDataOperationsSaveFormComponent } from './component/agenda-list-view/agenda-list-view-data-operations/task-data-operations-save-form/task-data-operations-save-form.component';
import { TaskDataOperationsUpdateFormComponent } from './component/agenda-list-view/agenda-list-view-data-operations/task-data-operations-update-form/task-data-operations-update-form.component';
import { TaskDataOperationsNavigationComponent } from './component/agenda-list-view/agenda-list-view-data-operations/task-data-operations-navigation/task-data-operations-navigation.component';
import { AgendaMonthlyViewCalendarComponent } from './component/agenda-monthly-view/agenda-monthly-view-calendar/agenda-monthly-view-calendar.component';
import { AgendaMonthlyViewListComponent } from './component/agenda-monthly-view/agenda-monthly-view-list/agenda-monthly-view-list.component';

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
        SubjectDataOperationsUpdateFormComponent,
        TeacherDataOperationsUpdateFormComponent,
        LessonListComponent,
        LessonDataOperationsComponent,
        LessonDataOperationsDescriptionComponent,
        LessonDataOperationsNavigationComponent,
        LessonDataOperationsSaveFormComponent,
        LessonDataOperationsUpdateFormComponent,
        TimetableDialogComponent,
        TimetableDailyViewListComponent,
        TimetableDailyViewDescriptionComponent,
        AgendaListViewListComponent,
        AgendaListViewDataOperationsComponent,
        TaskDataOperationsDescriptionComponent,
        TaskDataOperationsSaveFormComponent,
        TaskDataOperationsUpdateFormComponent,
        TaskDataOperationsNavigationComponent,
        AgendaMonthlyViewCalendarComponent,
        AgendaMonthlyViewListComponent,
    ],
    imports: [CommonModule, TimetableRoutingModule, SharedModule],
    providers: [],
})
export class TimetableModule {}
