import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { UserService } from 'src/app/shared/service/user.service';

export const drawerModes = ['side', 'over'] as const;
export type DrawerModes = (typeof drawerModes)[number];

@Component({
    selector: 'app-forum-navigation',
    templateUrl: './forum-navigation.component.html',
    styleUrls: ['./forum-navigation.component.scss'],
})
export class ForumNavigationComponent implements OnInit {
    @ViewChild('drawer') drawer!: MatDrawer;
    drawerMode: DrawerModes = 'side';
    constructor(private renderer: Renderer2, private userService: UserService) {
        this.renderer.listen('window', 'resize', this.windowResizeEvent);
        this.drawerMode = this.isInMobileView() ? 'over' : 'side';
    }

    ngOnInit(): void {}

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
}
