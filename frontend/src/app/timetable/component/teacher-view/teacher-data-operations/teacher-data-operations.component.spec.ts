import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDataOperationsComponent } from './teacher-data-operations.component';

describe('TeacherDataOperationsComponent', () => {
  let component: TeacherDataOperationsComponent;
  let fixture: ComponentFixture<TeacherDataOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDataOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDataOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
