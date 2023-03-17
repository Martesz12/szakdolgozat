import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumMainComponent } from './forum-main/forum-main.component';
import { ForumCreateFormComponent } from './forum-create-form/forum-create-form.component';
import { ForumManagementComponent } from './forum-management/forum-management.component';

const routes: Routes = [
    {
        path: 'main',
        component: ForumMainComponent,
    },
    {
        path: 'create-request',
        component: ForumCreateFormComponent,
    },
    {
        path: 'management',
        component: ForumManagementComponent,
    },
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ForumRoutingModule {}
