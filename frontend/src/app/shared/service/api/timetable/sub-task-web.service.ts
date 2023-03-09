import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { SubTaskDto } from 'src/app/shared/model/timetable/dto/sub-task.dto';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';

@Injectable({
    providedIn: 'root',
})
export class SubTaskWebService {
    private specificUrl: string = 'subTask/';

    constructor(private http: HttpClient, private userService: UserService) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllSubTask(): Observable<SubTaskDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<SubTaskDto[]>(fullPath, { headers: this.createHeader() });
    }

    getSubTasksByMainTaskIds(mainTaskIds: number[]): Observable<SubTaskDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindByMainTaskIds);
        return this.http.post<SubTaskDto[]>(fullPath, mainTaskIds, { headers: this.createHeader() });
    }

    getSubTaskById(subTaskId: number): Observable<SubTaskDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + subTaskId;
        return this.http.get<SubTaskDto>(fullPath, { headers: this.createHeader() });
    }

    addSubTask(subTask: SubTaskDto): Observable<SubTaskDto> {
        const fullPath = this.buildFullPath(ApiPath.Add);
        return this.http.post<SubTaskDto>(fullPath, subTask, { headers: this.createHeader() });
    }

    updateSubTask(subTask: SubTaskDto): Observable<SubTaskDto> {
        const fullPath = this.buildFullPath(ApiPath.Update);
        return this.http.put<SubTaskDto>(fullPath, subTask, { headers: this.createHeader() });
    }

    deleteSubTask(subTaskId: number): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.Delete);
        fullPath += '/' + subTaskId;
        return this.http.delete<any>(fullPath, { headers: this.createHeader() });
    }

    createHeader(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.userService.getToken()}`,
          })
    }
}
