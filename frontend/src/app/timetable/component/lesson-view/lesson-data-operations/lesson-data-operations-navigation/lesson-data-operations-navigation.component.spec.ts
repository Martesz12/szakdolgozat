import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDataOperationsNavigationComponent } from './lesson-data-operations-navigation.component';

describe('LessonDataOperationsNavigationComponent', () => {
  let component: LessonDataOperationsNavigationComponent;
  let fixture: ComponentFixture<LessonDataOperationsNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonDataOperationsNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonDataOperationsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
