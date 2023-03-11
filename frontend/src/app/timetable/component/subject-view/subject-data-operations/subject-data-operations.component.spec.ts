import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDataOperationsComponent } from './subject-data-operations.component';

describe('SubjectDataOperationsComponent', () => {
    let component: SubjectDataOperationsComponent;
    let fixture: ComponentFixture<SubjectDataOperationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SubjectDataOperationsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SubjectDataOperationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
