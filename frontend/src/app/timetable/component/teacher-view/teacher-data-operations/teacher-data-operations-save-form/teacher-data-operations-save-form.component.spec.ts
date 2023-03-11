import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDataOperationsSaveFormComponent } from './teacher-data-operations-save-form.component';

describe('TeacherDataOperationsSaveFormComponent', () => {
    let component: TeacherDataOperationsSaveFormComponent;
    let fixture: ComponentFixture<TeacherDataOperationsSaveFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TeacherDataOperationsSaveFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TeacherDataOperationsSaveFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
