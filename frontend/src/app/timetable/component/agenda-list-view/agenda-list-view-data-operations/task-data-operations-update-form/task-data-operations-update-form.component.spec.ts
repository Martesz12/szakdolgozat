import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDataOperationsUpdateFormComponent } from './task-data-operations-update-form.component';

describe('TaskDataOperationsUpdateFormComponent', () => {
    let component: TaskDataOperationsUpdateFormComponent;
    let fixture: ComponentFixture<TaskDataOperationsUpdateFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskDataOperationsUpdateFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskDataOperationsUpdateFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
