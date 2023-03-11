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
    selectedTimetableId: number = 0;

    @ViewChild('timetableSelect') timetableSelect!: MatSelect;

    constructor(public router: Router, public timetableService: TimetableService, private dialog: MatDialog) {
        this.dataSource.data = SideMenuNodes.TimetableSideMenuNodes;
        this.treeControl.dataNodes = this.dataSource.data;
        this.treeControl.expandAll();
        this.getSelectedTimetableId();
        this.router.navigateByUrl(this.router.url);
    }

    getSelectedTimetableId(): void {
        this.timetableService
            .getSelectedTimetableId()
            .subscribe(timetableId => (this.selectedTimetableId = timetableId));
    }

    hasChild = (_: number, node: TimetableSideMenuNode) => !!node.children && node.children.length > 0;

    onEditTimetableClicked(): void {
        this.timetableSelect.close();
        this.dialog.open(TimetableDialogComponent, {
            height: '500px',
            width: '400px',
            disableClose: true,
        });
    }

    onTimetableSelected(selectChangeEvent: MatSelectChange): void {
        this.timetableService.setSelectedTimetableId(selectChangeEvent.value);
        localStorage.setItem('selectedTimetableId', selectChangeEvent.value);
    }
}
