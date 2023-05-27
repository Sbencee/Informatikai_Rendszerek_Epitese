import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { VideosComponent } from './components/videos/videos.component';
import { VideosListComponent } from './components/videos-list/videos-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './components/users/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { LoansComponent } from './components/loans/loans.component';
import { LoansListComponent } from './components/loans-list/loans-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    VideosComponent,
    VideosListComponent,
    UsersComponent,
    UsersListComponent,
    LoansComponent,
    LoansListComponent,
    UserFormComponent,
    LoanFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
