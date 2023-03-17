import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumManagementUpdateFormComponent } from './forum-management-update-form.component';

describe('ForumManagementUpdateFormComponent', () => {
  let component: ForumManagementUpdateFormComponent;
  let fixture: ComponentFixture<ForumManagementUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumManagementUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumManagementUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
