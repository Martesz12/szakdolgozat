import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSideMenuComponent } from './forum-side-menu.component';

describe('ForumSideMenuComponent', () => {
  let component: ForumSideMenuComponent;
  let fixture: ComponentFixture<ForumSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumSideMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
