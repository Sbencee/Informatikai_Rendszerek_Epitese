import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosListComponent } from './components/videos-list/videos-list.component';
import { LoansListComponent } from './components/loans-list/loans-list.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';

const routes: Routes = [
  {
    path: 'videos',
    component: VideosListComponent
  },
  {
    path: 'videos/:id',
    component: VideosListComponent
  },
  {
    path: 'users',
    component: UsersListComponent
  },
  {
    path: 'users/:id',
    component: UserFormComponent
  },
  {
    path: 'loans',
    component: LoansListComponent
  },
  {
    path: 'loans/:id',
    component: LoanFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
