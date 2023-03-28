import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';
import { UniversityDto } from 'src/app/shared/model/forum/university.dto';
import { TeacherDto } from '../../../model/timetable/dto/teacher.dto';

@Injectable({
    providedIn: 'root',
})
export class UniversityWebService {
    private specificUrl: string = 'university/';

    constructor(private http: HttpClient, private userService: UserService) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllUniversity(): Observable<UniversityDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<UniversityDto[]>(fullPath, { headers: this.createHeader() });
    }

    getUniversityById(universityId: number): Observable<UniversityDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + universityId;
        return this.http.get<UniversityDto>(fullPath, { headers: this.createHeader() });
    }

    createHeader(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.userService.getToken()}`,
        });
    }
}
