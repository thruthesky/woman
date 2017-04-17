import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';



import { AngularBackend } from './angular-backend/angular-backend';

import { AngularBackendAdmin } from './angular-backend/angular-backend-admin';


import { AppComponent } from './app.component';
import { WomanModule } from './woman/woman.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularBackend,
    AngularBackendAdmin,
    WomanModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
