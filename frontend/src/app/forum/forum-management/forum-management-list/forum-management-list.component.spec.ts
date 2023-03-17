import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumManagementListComponent } from './forum-management-list.component';

describe('ForumManagementListComponent', () => {
  let component: ForumManagementListComponent;
  let fixture: ComponentFixture<ForumManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumManagementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
