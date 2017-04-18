import { Component } from '@angular/core';
@Component({
    templateUrl: './home.html'
})
export class HomePage {
    constructor() {
        window['url_backend_api'] = "https://womanapp.sonub.com/index.php";
    }
}