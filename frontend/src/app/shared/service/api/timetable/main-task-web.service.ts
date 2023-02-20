import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { MainTaskDto } from 'src/app/shared/model/timetable/dto/main-task.dto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MainTaskWebService {
    private specificUrl: string = 'mainTask/';

    constructor(private http: HttpClient) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllMainTask(): Observable<MainTaskDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<MainTaskDto[]>(fullPath);
    }

    getMainTasksByLessonIds(lessonIds: number[]): Observable<MainTaskDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindByLessonIds);
        return this.http.post<MainTaskDto[]>(fullPath, lessonIds);
    }

    getMainTaskById(mainTaskId: number): Observable<MainTaskDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + mainTaskId;
        return this.http.get<MainTaskDto>(fullPath);
    }

    addMainTask(mainTask: MainTaskDto): Observable<MainTaskDto> {
        const fullPath = this.buildFullPath(ApiPath.Add);
        return this.http.post<MainTaskDto>(fullPath, mainTask);
    }

    updateMainTask(mainTask: MainTaskDto): Observable<MainTaskDto> {
        const fullPath = this.buildFullPath(ApiPath.Update);
        return this.http.put<MainTaskDto>(fullPath, mainTask);
    }

    deleteMainTask(mainTaskId: number): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.Delete);
        fullPath += '/' + mainTaskId;
        return this.http.delete<any>(fullPath);
    }
}
