import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';
import { UniversityDto } from 'src/app/shared/model/forum/university.dto';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UniversityWebService {
    private specificUrl: string = 'university/';

    constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllUniversity(): Observable<UniversityDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<UniversityDto[]>(fullPath, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    getUniversityById(universityId: number): Observable<UniversityDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + universityId;
        return this.http.get<UniversityDto>(fullPath, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    createHeader(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.userService.getToken()}`,
        });
    }
}
