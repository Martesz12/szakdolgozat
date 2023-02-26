import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

export const drawerModes = ['side', 'over'] as const;
export type DrawerModes = typeof drawerModes[number];

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
    @ViewChild('drawer') drawer!: MatDrawer;
    drawerMode: DrawerModes = 'side';
    constructor(private renderer: Renderer2) {
        this.renderer.listen('window', 'resize', this.scrollEvent);
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
        return this.getScreenWidth() <= 1000;
    }
    scrollEvent = (e: Event) => {
        if (this.isInMobileView()) {
            if (this.drawerMode === 'side') this.drawer.toggle();
            this.drawerMode = 'over';
        } else {
            if (this.drawerMode === 'over') this.drawer.toggle();
            this.drawerMode = 'side';
        }
    };
}
