import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaListViewListComponent } from './agenda-list-view-list.component';

describe('AgendaListViewListComponent', () => {
  let component: AgendaListViewListComponent;
  let fixture: ComponentFixture<AgendaListViewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaListViewListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaListViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
