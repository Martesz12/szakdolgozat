import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ForumDto } from 'src/app/shared/model/forum/forum.dto';
import { ForumService } from 'src/app/shared/service/forum/forum.service';
import { FormControl } from '@angular/forms';
import { UniversityDto } from '../../shared/model/forum/university.dto';
import { FacultyDto } from '../../shared/model/forum/faculty.dto';
import { MajorDto } from '../../shared/model/forum/major.dto';
import { UniversityService } from '../../shared/service/forum/university.service';
import { FacultyService } from '../../shared/service/forum/faculty.service';
import { MajorService } from '../../shared/service/forum/major.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/service/user.service';

@Component({
    selector: 'app-forum-side-menu',
    templateUrl: './forum-side-menu.component.html',
    styleUrls: ['./forum-side-menu.component.scss'],
})
export class ForumSideMenuComponent implements OnInit, OnDestroy {
    allForum: ForumDto[] = [];
    filteredForums: ForumDto[] = [];
    filteredAllForums: ForumDto[] = [];
    filterText: string = '';

    universityFilter = new FormControl(0);
    majorsFilter = new FormControl([] as number[]);
    facultiesFilter = new FormControl([] as number[]);
    allUniversity: UniversityDto[] = [];
    allFaculty: FacultyDto[] = [];
    filteredFaculties: FacultyDto[] = [];
    allMajor: MajorDto[] = [];
    filteredMajors: MajorDto[] = [];
    selectedForumId: number = 0;
    isUserAdmin: boolean = false;

    constructor(
        private forumService: ForumService,
        private changeDetection: ChangeDetectorRef,
        private universityService: UniversityService,
        private facultyService: FacultyService,
        private majorService: MajorService,
        private router: Router,
        public userService: UserService
    ) {}

    ngOnInit(): void {
        this.getAllForum();
        this.getAllUniversity();
        this.getAllFaculty();
        this.getAllMajor();
        this.setViewdForum();
        this.userService.isUserAdmin().subscribe(isAdmin => (this.isUserAdmin = isAdmin));
        this.getDefaultForumFilter();
    }

    getDefaultForumFilter(): void {
        this.userService.getUserByToken().subscribe(user => {
            if (user.universityPreference) {
                this.universityFilter.setValue(user.universityPreference);
                this.universityChanged(user.universityPreference);
                if (user.facultiesPreference) {
                    this.facultiesFilter.setValue(user.facultiesPreference);
                    this.facultyChanged(user.facultiesPreference);
                    if (user.majorsPreference) {
                        this.majorsFilter.setValue(user.majorsPreference);
                    }
                }
            }
            this.filterForumsByEducation();
        });
    }

    ngOnDestroy() {
        this.selectedForumId = 0;
    }

    setViewdForum(): void {
        if (this.router.url === '/forum/main' && localStorage.getItem('viewdForum')) {
            this.selectForum(+localStorage.getItem('viewdForum')!);
        }
    }

    private getAllForum() {
        this.forumService.getAllForumSubject().subscribe(forums => {
            this.allForum = forums.filter(forum => forum.approved);
            this.filteredForums = forums.filter(forum => forum.approved);
            this.filteredAllForums = forums.filter(forum => forum.approved);
            this.filterForumsByEducation();
        });
    }

    getAllUniversity(): void {
        this.universityService.getAllUniversitySubject().subscribe(allUniversity => {
            this.allUniversity = allUniversity;
        });
    }

    getAllFaculty(): void {
        this.facultyService.getAllFacultySubject().subscribe(allFaculty => {
            this.allFaculty = allFaculty;
        });
    }

    getAllMajor(): void {
        this.majorService.getAllMajorSubject().subscribe(allMajor => {
            this.allMajor = allMajor;
        });
    }

    universityChanged(universityId: number): void {
        this.filteredFaculties = this.allFaculty.filter(faculty => faculty.universityId === universityId);
        this.facultiesFilter.setValue([]);
        this.majorsFilter.setValue([]);
    }

    facultyChanged(facultyIds: number[]): void {
        let majorIds: number[] = [];
        this.allFaculty.forEach(faculty => {
            if (facultyIds.includes(faculty.id!)) majorIds.push(...faculty.majorIds);
        });
        this.filteredMajors = this.allMajor.filter(major => majorIds.includes(major.id!));
        this.majorsFilter.setValue(this.majorsFilter.value!.filter(majorId => majorIds.includes(majorId)));
    }

    applyFilter() {
        this.filterOnAllForum();
        this.changeDetection.detectChanges();
        this.highlightMatch();
    }

    private filterOnAllForum() {
        this.filteredForums = this.filteredAllForums.filter(forum =>
            forum.name.toLowerCase().includes(this.filterText.toLowerCase())
        );
    }

    private highlightMatch() {
        let matchingAttributes = document.getElementsByClassName('forum-name');
        let lowerFilterText = this.filterText.toLowerCase();
        let lowerAttributeText = '';
        let originalAttributeText = '';
        let indexOfMatching = 0;
        let highlightOpeningTag = '<span style="color: red">';
        let highlightClosingTag = '</span>';

        for (let i = 0; i < matchingAttributes.length; i++) {
            originalAttributeText = matchingAttributes[i].innerHTML;
            if (originalAttributeText.includes(highlightOpeningTag)) {
                originalAttributeText = originalAttributeText.replace(highlightOpeningTag, '');
                originalAttributeText = originalAttributeText.replace(highlightClosingTag, '');
            }
            lowerAttributeText = originalAttributeText.toLowerCase();
            if (lowerAttributeText.includes(lowerFilterText)) {
                indexOfMatching = lowerAttributeText.indexOf(lowerFilterText);
                matchingAttributes[i].innerHTML =
                    originalAttributeText.substring(0, indexOfMatching) +
                    highlightOpeningTag +
                    originalAttributeText.substring(indexOfMatching, indexOfMatching + lowerFilterText.length) +
                    highlightClosingTag +
                    originalAttributeText.substring(indexOfMatching + lowerFilterText.length);
            } else {
                matchingAttributes[i].innerHTML = originalAttributeText;
            }
        }
    }

    filterForumsByEducation(): void {
        this.filterText = '';
        this.applyFilter();
        if (this.universityFilter.value !== 0) {
            this.filteredForums = this.allForum.filter(forum => forum.universityId === this.universityFilter.value);
            this.filteredAllForums = this.allForum.filter(forum => forum.universityId === this.universityFilter.value);
        } else this.filteredForums = this.allForum;
        if (!!this.facultiesFilter.value?.length) {
            this.filteredForums = this.filteredAllForums.filter(forum =>
                this.haveArraysSameElement(forum.facultyIds, this.facultiesFilter.value!)
            );
            this.filteredAllForums = this.filteredAllForums.filter(forum =>
                this.haveArraysSameElement(forum.facultyIds, this.facultiesFilter.value!)
            );
        }
        if (!!this.majorsFilter.value?.length) {
            this.filteredForums = this.filteredAllForums.filter(forum =>
                this.haveArraysSameElement(forum.majorIds, this.majorsFilter.value!)
            );
            this.filteredAllForums = this.filteredAllForums.filter(forum =>
                this.haveArraysSameElement(forum.majorIds, this.majorsFilter.value!)
            );
        }
    }

    haveArraysSameElement(array1: number[], array2: number[]): boolean {
        return !!array1.filter(element => array2.includes(element)).length;
    }

    selectForum(id: number): void {
        this.selectedForumId = id;
        this.forumService.selectForum(id);
        localStorage.setItem('viewdForum', String(id));
        if (this.router.url !== '/forum/main') this.router.navigateByUrl('forum/main');
    }

    goToForumView(view: string) {
        this.router.navigateByUrl(`forum/${view}`);
        this.selectedForumId = 0;
        localStorage.removeItem('viewdForum');
    }
}
