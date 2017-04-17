import { Component } from '@angular/core';
import {
    User
} from './../../../angular-backend/angular-backend';
@Component({
    selector: 'header-component',
    templateUrl: './header.html'
})
export class HeaderComponent {
    showPanel: boolean = false;
    constructor( private user: User ) {}
    onClickLogout() {
        this.user.logout();
    }
}
