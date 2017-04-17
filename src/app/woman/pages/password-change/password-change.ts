import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'password-change-page',
  templateUrl: './password-change.html'
})
export class PasswordChangePage {
  error
  constructor(
    public router: Router
  ){}
}
