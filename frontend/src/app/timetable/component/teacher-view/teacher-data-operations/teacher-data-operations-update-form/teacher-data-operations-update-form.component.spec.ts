import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDataOperationsUpdateFormComponent } from './teacher-data-operations-update-form.component';

describe('TeacherDataOperationsUpdateFormComponent', () => {
    let component: TeacherDataOperationsUpdateFormComponent;
    let fixture: ComponentFixture<TeacherDataOperationsUpdateFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TeacherDataOperationsUpdateFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TeacherDataOperationsUpdateFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
