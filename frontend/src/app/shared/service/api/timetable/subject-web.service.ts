import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';

@Injectable({
    providedIn: 'root',
})
export class SubjectWebService {
    private specificUrl: string = 'subject/';

    constructor(private http: HttpClient, private userService: UserService) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllSubject(): Observable<SubjectDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<SubjectDto[]>(fullPath, { headers: this.createHeader() });
    }

    getSubjectById(subjectId: number): Observable<SubjectDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + subjectId;
        return this.http.get<SubjectDto>(fullPath, { headers: this.createHeader() });
    }

    getSubjectsByUserId(userId: number): Observable<SubjectDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindByUserId);
        fullPath += '/' + userId;
        return this.http.get<SubjectDto[]>(fullPath, { headers: this.createHeader() });
    }

    addSubject(subject: SubjectDto): Observable<SubjectDto> {
        const fullPath = this.buildFullPath(ApiPath.Add);
        return this.http.post<SubjectDto>(fullPath, subject, { headers: this.createHeader() });
    }

    updateSubject(subject: SubjectDto): Observable<SubjectDto> {
        const fullPath = this.buildFullPath(ApiPath.Update);
        return this.http.put<SubjectDto>(fullPath, subject, { headers: this.createHeader() });
    }

    deleteSubject(subjectId: number): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.Delete);
        fullPath += '/' + subjectId;
        return this.http.delete<any>(fullPath, { headers: this.createHeader() });
    }

    createHeader(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.userService.getToken()}`,
          })
    }
}
