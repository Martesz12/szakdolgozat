import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDataOperationsNavigationComponent } from './teacher-data-operations-navigation.component';

describe('TeacherDataOperationsNavigationComponent', () => {
  let component: TeacherDataOperationsNavigationComponent;
  let fixture: ComponentFixture<TeacherDataOperationsNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDataOperationsNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDataOperationsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
