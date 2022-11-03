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
import { TeacherWebService } from '../shared/service/api/timetable/teacher-web.service';

@NgModule({
  declarations: [
    TimetableWeeklyViewComponent,
    TimetableDailyViewComponent,
    SubjectViewComponent,
    TeacherViewComponent,
    LessonViewComponent,
    AgendaListViewComponent,
    AgendaMonthlyViewComponent,
  ],
  imports: [CommonModule, TimetableRoutingModule, SharedModule],
  providers: [],
})
export class TimetableModule {}
