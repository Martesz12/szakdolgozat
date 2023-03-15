import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FacultyDto } from 'src/app/shared/model/forum/faculty.dto';
import { MajorDto } from 'src/app/shared/model/forum/major.dto';
import { UniversityDto } from 'src/app/shared/model/forum/university.dto';
import { UniversityService } from 'src/app/shared/service/forum/university.service';

@Component({
    selector: 'app-forum-create-form',
    templateUrl: './forum-create-form.component.html',
    styleUrls: ['./forum-create-form.component.scss'],
})
export class ForumCreateFormComponent implements OnInit {
    newName = new FormControl('');
    newDescription = new FormControl('');
    newUniversity = new FormControl('');
    newMajors = new FormControl('');
    newFaculties = new FormControl('');

    allUniversity: UniversityDto[] = [];
    allFaculty: FacultyDto[] = [];
    allMajor: MajorDto[] = []

    constructor(private universityService: UniversityService) {}

    ngOnInit(): void {
        this.newName?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.newDescription?.addValidators(Validators.maxLength(255));
        this.newUniversity?.addValidators(Validators.required);
        this.newMajors?.addValidators(Validators.required);
        this.newFaculties?.addValidators(Validators.required);
    }


}
