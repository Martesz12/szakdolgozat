import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDataOperationsSaveFormComponent } from './subject-data-operations-save-form.component';

describe('SubjectDataOperationsSaveFormComponent', () => {
  let component: SubjectDataOperationsSaveFormComponent;
  let fixture: ComponentFixture<SubjectDataOperationsSaveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectDataOperationsSaveFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectDataOperationsSaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
