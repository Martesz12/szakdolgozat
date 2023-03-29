import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { MainTaskDto } from 'src/app/shared/model/timetable/dto/main-task.dto';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class MainTaskWebService {
    private specificUrl: string = 'mainTask/';

    constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllMainTask(): Observable<MainTaskDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<MainTaskDto[]>(fullPath, { headers: this.createHeader() }).pipe(
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

    getMainTasksByLessonIds(lessonIds: number[]): Observable<MainTaskDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindByLessonIds);
        return this.http.post<MainTaskDto[]>(fullPath, lessonIds, { headers: this.createHeader() }).pipe(
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

    getMainTaskById(mainTaskId: number): Observable<MainTaskDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + mainTaskId;
        return this.http.get<MainTaskDto>(fullPath, { headers: this.createHeader() }).pipe(
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

    addMainTask(mainTask: MainTaskDto): Observable<MainTaskDto> {
        const fullPath = this.buildFullPath(ApiPath.Add);
        return this.http.post<MainTaskDto>(fullPath, mainTask, { headers: this.createHeader() }).pipe(
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

    updateMainTask(mainTask: MainTaskDto): Observable<MainTaskDto> {
        const fullPath = this.buildFullPath(ApiPath.Update);
        return this.http.put<MainTaskDto>(fullPath, mainTask, { headers: this.createHeader() }).pipe(
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

    deleteMainTask(mainTaskId: number): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.Delete);
        fullPath += '/' + mainTaskId;
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
