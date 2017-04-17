import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'login-page',
  templateUrl: './login.html',
  styleUrls:['./login.scss']
})
export class LoginPage {
  error
  constructor(
    public router: Router
  ){}
}
