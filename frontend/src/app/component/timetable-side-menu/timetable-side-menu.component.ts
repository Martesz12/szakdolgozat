import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { SideMenuNodes } from 'src/app/shared/enum/side-menu-nodes';
import { TimetableSideMenuNode } from 'src/app/shared/model/timetable/timetable-side-menu-node';

@Component({
  selector: 'app-timetable-side-menu',
  templateUrl: './timetable-side-menu.component.html',
  styleUrls: ['./timetable-side-menu.component.scss'],
})
export class TimetableSideMenuComponent {
  treeControl = new NestedTreeControl<TimetableSideMenuNode>(
    (node) => node.children
  );
  dataSource = new MatTreeNestedDataSource<TimetableSideMenuNode>();

  constructor(private router: Router) {
    this.dataSource.data = SideMenuNodes.TimetableSideMenuNodes;
  }

  hasChild = (_: number, node: TimetableSideMenuNode) =>
    !!node.children && node.children.length > 0;

  onMenuElementSelected(menuElementId: number) {
    if(menuElementId === 11) this.router.navigateByUrl('timetable/timetable-weekly');
    else if(menuElementId === 12) this.router.navigateByUrl('timetable/timetable-daily');
    else if(menuElementId === 21) this.router.navigateByUrl('timetable/subject');
    else if(menuElementId === 22) this.router.navigateByUrl('timetable/teacher');
    else if(menuElementId === 23) this.router.navigateByUrl('timetable/lesson');
    else if(menuElementId === 31) this.router.navigateByUrl('timetable/agenda-list');
    else if(menuElementId === 32) this.router.navigateByUrl('timetable/agenda-monthly');
  }
}
