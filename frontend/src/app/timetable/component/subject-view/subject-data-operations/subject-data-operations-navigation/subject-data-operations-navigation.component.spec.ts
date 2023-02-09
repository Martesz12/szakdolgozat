import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDataOperationsNavigationComponent } from './subject-data-operations-navigation.component';

describe('SubjectDataOperationsNavigationComponent', () => {
  let component: SubjectDataOperationsNavigationComponent;
  let fixture: ComponentFixture<SubjectDataOperationsNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectDataOperationsNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectDataOperationsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
