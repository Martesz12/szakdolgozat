import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDataOperationsSaveFormComponent } from './lesson-data-operations-save-form.component';

describe('LessonDataOperationsSaveFormComponent', () => {
  let component: LessonDataOperationsSaveFormComponent;
  let fixture: ComponentFixture<LessonDataOperationsSaveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonDataOperationsSaveFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonDataOperationsSaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
