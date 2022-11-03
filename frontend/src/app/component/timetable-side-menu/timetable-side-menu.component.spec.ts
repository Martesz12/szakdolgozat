import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableSideMenuComponent } from './timetable-side-menu.component';

describe('SideMenuComponent', () => {
  let component: TimetableSideMenuComponent;
  let fixture: ComponentFixture<TimetableSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableSideMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
