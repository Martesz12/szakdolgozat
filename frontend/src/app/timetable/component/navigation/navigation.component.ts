import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';
import { UserService } from 'src/app/shared/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../../../component/profile/profile.component';

export const drawerModes = ['side', 'over'] as const;
export type DrawerModes = (typeof drawerModes)[number];

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
    @ViewChild('drawer') drawer!: MatDrawer;
    drawerMode: DrawerModes = 'side';
    constructor(
        private renderer: Renderer2,
        private userService: UserService,
        private timetableService: TimetableService,
        private dialog: MatDialog
    ) {
        this.renderer.listen('window', 'resize', this.windowResizeEvent);
        this.drawerMode = this.isInMobileView() ? 'over' : 'side';
    }

    ngOnInit(): void {
        let timetableId = localStorage.getItem('selectedTimetableId');
        if (timetableId) this.timetableService.setSelectedTimetableId(+timetableId);
    }

    onToggleSidenav(sidenav: MatSidenav) {
        sidenav.toggle();
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 1200;
    }
    windowResizeEvent = (e: Event) => {
        if (this.isInMobileView()) {
            if (this.drawerMode === 'side') this.drawer.toggle();
            this.drawerMode = 'over';
        } else {
            if (this.drawerMode === 'over') this.drawer.toggle();
            this.drawerMode = 'side';
        }
    };

    onLogoutClick(): void {
        this.userService.logout();
    }

    openProfileDialog() {
        this.dialog.open(ProfileComponent, {
            width: '90%',
            height: '90%',
        });
    }
}
