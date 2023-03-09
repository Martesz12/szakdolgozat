import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './timetable/component/navigation/navigation.component';
import { AuthGuardService as AuthGuard } from './shared/service/auth-guard.service';

const routes: Routes = [
    {
      path: 'authentication',
      loadChildren: () =>
        import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
    },
    {
        path: 'timetable',
        loadChildren: () => import('./timetable/timetable.module').then(m => m.TimetableModule),
        component: NavigationComponent,
        canActivate: [AuthGuard]
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
