import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDataOperationsDescriptionComponent } from './teacher-data-operations-description.component';

describe('TeacherDataOperationsDescriptionComponent', () => {
  let component: TeacherDataOperationsDescriptionComponent;
  let fixture: ComponentFixture<TeacherDataOperationsDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDataOperationsDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDataOperationsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
