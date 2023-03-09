import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumComponent } from './forum.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ForumComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    SharedModule
  ]
})
export class ForumModule { }
