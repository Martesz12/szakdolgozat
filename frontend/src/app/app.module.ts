import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './component/navigation/navigation.component';
import { SharedModule } from './shared/shared.module';
import { TimetableModule } from './timetable/timetable.module';
import { TimetableSideMenuComponent } from './component/timetable-side-menu/timetable-side-menu.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, NavigationComponent, TimetableSideMenuComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule, TimetableModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
