import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';
import { MajorDto } from 'src/app/shared/model/forum/major.dto';
import { UserDto } from '../../../model/authentication/dto/user.dto';

@Injectable({
    providedIn: 'root',
})
export class MajorWebService {
    private specificUrl: string = 'major/';

    constructor(private http: HttpClient, private userService: UserService) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllMajor(): Observable<MajorDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<MajorDto[]>(fullPath, { headers: this.createHeader() });
    }

    getMajorsByIds(majorIds: number[]): Observable<MajorDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindMajorsByIds);
        return this.http.post<MajorDto[]>(fullPath, majorIds, { headers: this.createHeader() });
    }

    createHeader(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.userService.getToken()}`,
        });
    }
}
