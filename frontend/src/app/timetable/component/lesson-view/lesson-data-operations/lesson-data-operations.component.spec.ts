import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDataOperationsComponent } from './lesson-data-operations.component';

describe('LessonDataOperationsComponent', () => {
    let component: LessonDataOperationsComponent;
    let fixture: ComponentFixture<LessonDataOperationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LessonDataOperationsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LessonDataOperationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
