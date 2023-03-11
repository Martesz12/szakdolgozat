import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDataOperationsDescriptionComponent } from './lesson-data-operations-description.component';

describe('LessonDataOperationsDescriptionComponent', () => {
    let component: LessonDataOperationsDescriptionComponent;
    let fixture: ComponentFixture<LessonDataOperationsDescriptionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LessonDataOperationsDescriptionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LessonDataOperationsDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
