import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { TimetableModule } from './timetable/timetable.module';
import { ProfileComponent } from './component/profile/profile.component';

@NgModule({
    declarations: [AppComponent, ProfileComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule, TimetableModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
