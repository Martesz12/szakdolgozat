import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumNavigationComponent } from './forum-navigation.component';

describe('ForumNavigationComponent', () => {
    let component: ForumNavigationComponent;
    let fixture: ComponentFixture<ForumNavigationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ForumNavigationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ForumNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
