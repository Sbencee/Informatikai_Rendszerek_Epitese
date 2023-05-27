import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() users!: User[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToUserForm(id: number) {
    this.router.navigate(['users', id]);
  }
}
