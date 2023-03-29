import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class LessonWebService {
    private specificUrl: string = 'lesson/';

    constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllLesson(): Observable<LessonDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<LessonDto[]>(fullPath, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    getLessonById(lessonId: number): Observable<LessonDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + lessonId;
        return this.http.get<LessonDto>(fullPath, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    getLessonsByTimetableId(timetableId: number): Observable<LessonDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindByTimetableId);
        fullPath += '/' + timetableId;
        return this.http.get<LessonDto[]>(fullPath, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    addLesson(lesson: LessonDto): Observable<LessonDto> {
        const fullPath = this.buildFullPath(ApiPath.Add);
        return this.http.post<LessonDto>(fullPath, lesson, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    updateLesson(lesson: LessonDto): Observable<LessonDto> {
        const fullPath = this.buildFullPath(ApiPath.Update);
        return this.http.put<LessonDto>(fullPath, lesson, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    deleteLesson(lessonId: number): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.Delete);
        fullPath += '/' + lessonId;
        return this.http.delete<any>(fullPath, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    createHeader(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.userService.getToken()}`,
        });
    }
}
