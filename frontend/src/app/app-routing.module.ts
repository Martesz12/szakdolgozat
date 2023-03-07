import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: 'authentication',
      loadChildren: () =>
        import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
    },
    {
        path: 'timetable',
        loadChildren: () => import('./timetable/timetable.module').then(m => m.TimetableModule),
        // canLoad: [AuthGuard],
    },
    {
        path: '',
        redirectTo: 'authentication',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
