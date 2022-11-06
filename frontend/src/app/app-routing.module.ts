import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // {
    //   path: 'login',
    //   loadChildren: () =>
    //     import('./login/login.module').then((m) => m.LoginModule),
    // },
    {
        path: 'timetable',
        loadChildren: () => import('./timetable/timetable.module').then(m => m.TimetableModule),
        // canLoad: [AuthGuard],
    },
    {
        path: '',
        redirectTo: 'timetable',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
