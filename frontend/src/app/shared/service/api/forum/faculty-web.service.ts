import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';
import { FacultyDto } from 'src/app/shared/model/forum/faculty.dto';
import { MajorDto } from '../../../model/forum/major.dto';

@Injectable({
    providedIn: 'root',
})
export class FacultyWebService {
    private specificUrl: string = 'faculty/';

    constructor(private http: HttpClient, private userService: UserService) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllFaculty(): Observable<FacultyDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<FacultyDto[]>(fullPath, { headers: this.createHeader() });
    }

    getFacultiesByIds(facultyIds: number[]): Observable<FacultyDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindFacultiesByIds);
        return this.http.post<FacultyDto[]>(fullPath, facultyIds, { headers: this.createHeader() });
    }

    createHeader(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.userService.getToken()}`,
        });
    }
}
