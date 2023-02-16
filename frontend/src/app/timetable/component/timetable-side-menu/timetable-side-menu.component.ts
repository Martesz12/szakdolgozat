import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SideMenuNodes } from 'src/app/shared/constant/side-menu-nodes';
import { TimetableDto } from 'src/app/shared/model/timetable/dto/timetable.dto';
import { TimetableSideMenuNode } from 'src/app/shared/model/timetable/timetable-side-menu-node';
import { NavigationService } from 'src/app/shared/service/navigation/navigation.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';
import { TimetableDialogComponent } from './timetable-dialog/timetable-dialog.component';

@Component({
    selector: 'app-timetable-side-menu',
    templateUrl: './timetable-side-menu.component.html',
    styleUrls: ['./timetable-side-menu.component.scss'],
})
export class TimetableSideMenuComponent {
    treeControl = new NestedTreeControl<TimetableSideMenuNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<TimetableSideMenuNode>();
    selectedMenuElement: number = 0;
    allTimetable$: Observable<TimetableDto[]> = this.timetableService.getAllTimetableSubject();

    @ViewChild('timetableSelect') timetableSelect!: MatSelect;

    constructor(
        private router: Router,
        private navigationService: NavigationService,
        private timetableService: TimetableService,
        private dialog: MatDialog
    ) {
        this.dataSource.data = SideMenuNodes.TimetableSideMenuNodes;
        this.treeControl.dataNodes = this.dataSource.data;
        this.navigationService.selectedTimetableMenuElement.subscribe(id => (this.selectedMenuElement = id));
        this.treeControl.expandAll();
    }

    hasChild = (_: number, node: TimetableSideMenuNode) => !!node.children && node.children.length > 0;

    onMenuElementSelected(menuElementId: number): void {
        this.navigationService.setSelectedTimetableMenuElement(menuElementId);
        if (menuElementId === 11) this.router.navigateByUrl('timetable/timetable-daily');
        else if (menuElementId === 12) this.router.navigateByUrl('timetable/timetable-weekly');
        else if (menuElementId === 21) this.router.navigateByUrl('timetable/subject');
        else if (menuElementId === 22) this.router.navigateByUrl('timetable/teacher');
        else if (menuElementId === 23) this.router.navigateByUrl('timetable/lesson');
        else if (menuElementId === 31) this.router.navigateByUrl('timetable/agenda-list');
        else if (menuElementId === 32) this.router.navigateByUrl('timetable/agenda-monthly');
    }

    onEditTimetableClicked(): void {
        this.timetableSelect.close()
        this.dialog.open(TimetableDialogComponent, {
            height: '500px',
            width: '400px',
            disableClose: true,
          });
    }

    onTimetableSelected(selectChangeEvent: MatSelectChange) {
        console.log(selectChangeEvent.value);
    }
}
