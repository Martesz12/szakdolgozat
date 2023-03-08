import { Component } from '@angular/core';
import { UserService } from './shared/service/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private userService: UserService) {
        let userId = localStorage.getItem('userId');
        let token = localStorage.getItem('token');
        if(userId) this.userService.setUserId(+userId);
        if(token) this.userService.setToken(token);
    }
}
