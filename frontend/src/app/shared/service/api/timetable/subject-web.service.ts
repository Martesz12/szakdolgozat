import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SubjectWebService {
    private specificUrl: string = 'subject/';

    constructor(private http: HttpClient) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllSubject(): Observable<SubjectDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<SubjectDto[]>(fullPath);
    }

    getSubjectById(subjectId: number): Observable<SubjectDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + subjectId;
        return this.http.get<SubjectDto>(fullPath);
    }

    addSubject(subject: SubjectDto): Observable<SubjectDto> {
        const fullPath = this.buildFullPath(ApiPath.Add);
        return this.http.post<SubjectDto>(fullPath, subject);
    }

    updateSubject(subject: SubjectDto): Observable<SubjectDto> {
        const fullPath = this.buildFullPath(ApiPath.Update);
        return this.http.put<SubjectDto>(fullPath, subject);
    }

    deleteSubject(subjectId: number): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.Delete);
        fullPath += '/' + subjectId;
        return this.http.delete<any>(fullPath);
    }
}
