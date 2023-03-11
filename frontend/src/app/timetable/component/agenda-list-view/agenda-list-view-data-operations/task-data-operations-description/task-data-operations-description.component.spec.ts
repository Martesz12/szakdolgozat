import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDataOperationsDescriptionComponent } from './task-data-operations-description.component';

describe('TaskDataOperationsDescriptionComponent', () => {
    let component: TaskDataOperationsDescriptionComponent;
    let fixture: ComponentFixture<TaskDataOperationsDescriptionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskDataOperationsDescriptionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskDataOperationsDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
