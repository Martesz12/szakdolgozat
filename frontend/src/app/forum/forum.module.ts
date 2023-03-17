import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumComponent } from './forum.component';
import { SharedModule } from '../shared/shared.module';
import { ForumNavigationComponent } from './forum-navigation/forum-navigation.component';
import { ForumMainComponent } from './forum-main/forum-main.component';
import { ForumSideMenuComponent } from './forum-side-menu/forum-side-menu.component';
import { ForumCreateFormComponent } from './forum-create-form/forum-create-form.component';
import { ForumManagementComponent } from './forum-management/forum-management.component';
import { ForumManagementListComponent } from './forum-management/forum-management-list/forum-management-list.component';
import { ForumManagementUpdateFormComponent } from './forum-management/forum-management-update-form/forum-management-update-form.component';

@NgModule({
    declarations: [ForumComponent, ForumNavigationComponent, ForumMainComponent, ForumSideMenuComponent, ForumCreateFormComponent, ForumManagementComponent, ForumManagementListComponent, ForumManagementUpdateFormComponent],
    imports: [CommonModule, ForumRoutingModule, SharedModule],
})
export class ForumModule {}
