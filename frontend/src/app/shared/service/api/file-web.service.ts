import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class FileWebService {
    private specificUrl: string = 'file/';

    constructor(private http: HttpClient) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    uploadMessageFile(file: File): Observable<string> {
        var fullPath = this.buildFullPath(ApiPath.UploadMessageFile);
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<string>(fullPath, formData, { headers: this.createHeader() });
    }

    getMessageFile(filename: string): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.GetMessageFile);
        fullPath += '/' + filename;
        return this.http.get<any>(fullPath, { headers: this.createHeader() });
    }

    createHeader(): HttpHeaders {
        let token = localStorage.getItem('token');
        return new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
    }
}
