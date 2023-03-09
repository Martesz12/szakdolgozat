import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumMainComponent } from './forum-main/forum-main.component';

const routes: Routes = [
    {
        path: 'main',
        component: ForumMainComponent,
    },
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
