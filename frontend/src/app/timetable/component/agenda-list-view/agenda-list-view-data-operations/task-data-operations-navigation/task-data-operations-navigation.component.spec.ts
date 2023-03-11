import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDataOperationsNavigationComponent } from './task-data-operations-navigation.component';

describe('TaskDataOperationsNavigationComponent', () => {
    let component: TaskDataOperationsNavigationComponent;
    let fixture: ComponentFixture<TaskDataOperationsNavigationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskDataOperationsNavigationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskDataOperationsNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
