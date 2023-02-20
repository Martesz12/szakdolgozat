import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaListViewDataOperationsComponent } from './agenda-list-view-data-operations.component';

describe('AgendaListViewDataOperationsComponent', () => {
  let component: AgendaListViewDataOperationsComponent;
  let fixture: ComponentFixture<AgendaListViewDataOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaListViewDataOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaListViewDataOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
