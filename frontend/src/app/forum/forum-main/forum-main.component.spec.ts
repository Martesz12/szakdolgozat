import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumMainComponent } from './forum-main.component';

describe('ForumMainComponent', () => {
  let component: ForumMainComponent;
  let fixture: ComponentFixture<ForumMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
