import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { SubTaskDto } from 'src/app/shared/model/timetable/dto/sub-task.dto';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class SubTaskWebService {
    private specificUrl: string = 'subTask/';

    constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllSubTask(): Observable<SubTaskDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<SubTaskDto[]>(fullPath, { headers: this.createHeader() }).pipe(
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

    getSubTasksByMainTaskIds(mainTaskIds: number[]): Observable<SubTaskDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindByMainTaskIds);
        return this.http.post<SubTaskDto[]>(fullPath, mainTaskIds, { headers: this.createHeader() }).pipe(
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

    getSubTaskById(subTaskId: number): Observable<SubTaskDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + subTaskId;
        return this.http.get<SubTaskDto>(fullPath, { headers: this.createHeader() }).pipe(
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

    addSubTask(subTask: SubTaskDto): Observable<SubTaskDto> {
        const fullPath = this.buildFullPath(ApiPath.Add);
        return this.http.post<SubTaskDto>(fullPath, subTask, { headers: this.createHeader() }).pipe(
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

    updateSubTask(subTask: SubTaskDto): Observable<SubTaskDto> {
        const fullPath = this.buildFullPath(ApiPath.Update);
        return this.http.put<SubTaskDto>(fullPath, subTask, { headers: this.createHeader() }).pipe(
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

    deleteSubTask(subTaskId: number): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.Delete);
        fullPath += '/' + subTaskId;
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
