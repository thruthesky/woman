import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  constructor() {
    /// backend url.
    window['url_backend_api'] = "https://womanapp.sonub.com/index.php";
  }
}


