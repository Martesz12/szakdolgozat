import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
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

  constructor() {
    this.dataSource.data = SideMenuNodes.TimetableSideMenuNodes;
  }

  hasChild = (_: number, node: TimetableSideMenuNode) =>
    !!node.children && node.children.length > 0;

  onMenuElementSelected(menuElementId: number) {
    
  }
}
