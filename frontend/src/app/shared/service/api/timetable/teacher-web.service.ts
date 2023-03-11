import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';

@Injectable({
    providedIn: 'root',
})
export class TeacherWebService {
    private specificUrl: string = 'teacher/';

    constructor(private http: HttpClient, private userService: UserService) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllTeacher(): Observable<TeacherDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<TeacherDto[]>(fullPath, { headers: this.createHeader() });
    }

    getTeacherById(teacherId: number): Observable<TeacherDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + teacherId;
        return this.http.get<TeacherDto>(fullPath, { headers: this.createHeader() });
    }

    getTeachersByUserId(userId: number): Observable<TeacherDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindByUserId);
        fullPath += '/' + userId;
        return this.http.get<TeacherDto[]>(fullPath, { headers: this.createHeader() });
    }

    addTeacher(teacher: TeacherDto): Observable<TeacherDto> {
        const fullPath = this.buildFullPath(ApiPath.Add);
        return this.http.post<TeacherDto>(fullPath, teacher, { headers: this.createHeader() });
    }

    updateTeacher(teacher: TeacherDto): Observable<TeacherDto> {
        const fullPath = this.buildFullPath(ApiPath.Update);
        return this.http.put<TeacherDto>(fullPath, teacher, { headers: this.createHeader() });
    }

    deleteTeacher(teacherId: number): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.Delete);
        fullPath += '/' + teacherId;
        return this.http.delete<any>(fullPath, { headers: this.createHeader() });
    }

    createHeader(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.userService.getToken()}`,
        });
    }
}
