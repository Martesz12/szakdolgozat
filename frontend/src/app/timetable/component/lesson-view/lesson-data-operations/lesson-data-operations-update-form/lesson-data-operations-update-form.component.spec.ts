import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDataOperationsUpdateFormComponent } from './lesson-data-operations-update-form.component';

describe('LessonDataOperationsUpdateFormComponent', () => {
  let component: LessonDataOperationsUpdateFormComponent;
  let fixture: ComponentFixture<LessonDataOperationsUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonDataOperationsUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonDataOperationsUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
