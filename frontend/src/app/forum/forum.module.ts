import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumComponent } from './forum.component';
import { SharedModule } from '../shared/shared.module';
import { ForumNavigationComponent } from './forum-navigation/forum-navigation.component';
import { ForumMainComponent } from './forum-main/forum-main.component';
import { ForumSideMenuComponent } from './forum-side-menu/forum-side-menu.component';

@NgModule({
    declarations: [ForumComponent, ForumNavigationComponent, ForumMainComponent, ForumSideMenuComponent],
    imports: [CommonModule, ForumRoutingModule, SharedModule],
})
export class ForumModule {}
