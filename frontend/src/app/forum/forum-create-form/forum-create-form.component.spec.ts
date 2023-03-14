import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCreateFormComponent } from './forum-create-form.component';

describe('ForumCreateFormComponent', () => {
  let component: ForumCreateFormComponent;
  let fixture: ComponentFixture<ForumCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumCreateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
