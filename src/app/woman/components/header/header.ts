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
    constructor( public user: User ) {}
    onClickLogout() {
        this.user.logout();
    }
    onClickReport() {
        alert("아직 지원하지 않는 기능입니다.");
    }
}
