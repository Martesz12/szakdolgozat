import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumMainPinnedMessagesComponent } from './forum-main-pinned-messages.component';

describe('ForumMainPinnedMessagesComponent', () => {
    let component: ForumMainPinnedMessagesComponent;
    let fixture: ComponentFixture<ForumMainPinnedMessagesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ForumMainPinnedMessagesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ForumMainPinnedMessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
