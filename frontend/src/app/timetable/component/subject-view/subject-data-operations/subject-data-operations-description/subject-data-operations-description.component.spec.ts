import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDataOperationsDescriptionComponent } from './subject-data-operations-description.component';

describe('SubjectDataOperationsDescriptionComponent', () => {
  let component: SubjectDataOperationsDescriptionComponent;
  let fixture: ComponentFixture<SubjectDataOperationsDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectDataOperationsDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectDataOperationsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
