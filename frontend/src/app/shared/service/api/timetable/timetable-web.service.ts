import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { TimetableDto } from 'src/app/shared/model/timetable/dto/timetable.dto';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';

@Injectable({
    providedIn: 'root',
})
export class TimetableWebService {
    private specificUrl: string = 'timetable/';

    constructor(private http: HttpClient, private userService: UserService) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllTimetable(): Observable<TimetableDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<TimetableDto[]>(fullPath, { headers: this.createHeader() });
    }

    getTimetableById(timetableId: number): Observable<TimetableDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + timetableId;
        return this.http.get<TimetableDto>(fullPath, { headers: this.createHeader() });
    }

    getTimetablesByUserId(userId: number): Observable<TimetableDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindByUserId);
        fullPath += '/' + userId;
        return this.http.get<TimetableDto[]>(fullPath, { headers: this.createHeader() });
    }

    addTimetable(timetable: TimetableDto): Observable<TimetableDto> {
        const fullPath = this.buildFullPath(ApiPath.Add);
        return this.http.post<TimetableDto>(fullPath, timetable, { headers: this.createHeader() });
    }

    updateTimetable(timetable: TimetableDto): Observable<TimetableDto> {
        const fullPath = this.buildFullPath(ApiPath.Update);
        return this.http.put<TimetableDto>(fullPath, timetable, { headers: this.createHeader() });
    }

    deleteTimetable(timetableId: number): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.Delete);
        fullPath += '/' + timetableId;
        return this.http.delete<any>(fullPath, { headers: this.createHeader() });
    }

    createHeader(): HttpHeaders {
        console.log(this.userService.getToken());
        return new HttpHeaders({
            'Authorization': `Bearer ${this.userService.getToken()}`,
          })
    }
}
