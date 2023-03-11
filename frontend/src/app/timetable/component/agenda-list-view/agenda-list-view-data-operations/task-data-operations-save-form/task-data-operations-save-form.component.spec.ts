import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDataOperationsSaveFormComponent } from './task-data-operations-save-form.component';

describe('TaskDataOperationsSaveFormComponent', () => {
    let component: TaskDataOperationsSaveFormComponent;
    let fixture: ComponentFixture<TaskDataOperationsSaveFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskDataOperationsSaveFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskDataOperationsSaveFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
