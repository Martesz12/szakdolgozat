import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaListViewComponent } from './agenda-list-view.component';

describe('AgendaListViewComponent', () => {
  let component: AgendaListViewComponent;
  let fixture: ComponentFixture<AgendaListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
