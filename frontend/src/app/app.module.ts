import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { TimetableModule } from './timetable/timetable.module';
import { ToolbarComponent } from './component/toolbar/toolbar.component';

@NgModule({
    declarations: [AppComponent, ToolbarComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule, TimetableModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
