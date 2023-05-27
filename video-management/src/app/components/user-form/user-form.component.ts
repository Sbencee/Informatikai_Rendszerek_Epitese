import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUser();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      personalId: ['', Validators.required],
      zipCode: [0, Validators.min(0)],
      city: ['', Validators.required],
      street: ['', Validators.required],
      age: [0, Validators.min(0)],
      email: ['', Validators.required]
    });
  }

  loadUser(): void {
    const userId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (userId) {
      this.userService.getUser(userId).subscribe(
        (user: User) => {
          this.userForm.patchValue(user);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
  
    const user: User = this.userForm.value;
    if (user.id) {
      this.userService.updateUser(user).pipe(
        catchError((error: any) => {
          this.errorMessage = error.message || 'Failed to update user.';
          return throwError(this.errorMessage);
        }),
        finalize(() => {
          this.router.navigate(['/users']);
        })
      ).subscribe(() => {
        this.successMessage = 'User updated successfully.';
      });
    } else {
      this.userService.createUser(user).pipe(
        catchError((error: any) => {
          this.errorMessage = error.message || 'Failed to create user.';
          return throwError(this.errorMessage);
        }),
        finalize(() => {
          this.router.navigate(['/users']);
        })
      ).subscribe((createdUser: User) => {
        this.successMessage = 'User is inserted with id ' + createdUser.id;
      });
    }
  }
}
