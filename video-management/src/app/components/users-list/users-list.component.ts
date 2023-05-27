import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  query: string = '';
  showNewUser: boolean = false;
  successMessage = "";
  errorMessage = "";

  constructor(private activatedRouter: ActivatedRoute,private formBuilder: FormBuilder, private userService: UserService) { }

  userForm = this.formBuilder.group({
    id: [0],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    personalId: ['', Validators.required],
    zipCode: [0, Validators.min(0)],
    city: ['', Validators.required],
    street: ['', Validators.required],
    age: [0, Validators.min(0)],
    email: ['', Validators.required],
    //imgUrl: ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mQSPWpQZPJ3szYgasgF40wHaFj%26pid%3DApi&f=1', Validators.pattern(/^(http|https):\/\//)],
    
  });

  showTag() {
    this.showNewUser = true;
  }

  async ngOnInit() {
    try {
      this.users = await lastValueFrom(this.userService.getUsers());
      const id = this.activatedRouter.snapshot.paramMap.get('id');
      if (id) {
        const user = await lastValueFrom(this.userService.getUser(parseInt(id)));
        if (user) {
          this.userForm.patchValue(user);
        } else {
          throw new Error('User not found.');
        }
      }
      console.log(this.users);
    } catch(err) {
      console.error(err);
      this.errorMessage = err.message;
    }
  }

  get firstName() {
    return this.userForm.controls['firstName'];
  }
  get lastName() {
    return this.userForm.controls['lastName'];
  }
  get phone() {
    return this.userForm.controls['phone'];
  }
  get personalId() {
    return this.userForm.controls['personalId'];
  }
  get zipCode() {
    return this.userForm.controls['zipCode'];
  }
  get city() {
    return this.userForm.controls['city'];
  }
  get street() {
    return this.userForm.controls['street'];
  }
  get age() {
    return this.userForm.controls['age'];
  }
  get email() {
    return this.userForm.controls['email'];
  }

  async insertNewUser() {
    this.errorMessage = '';
    this.successMessage = '';
    const user: Partial<User> = this.userForm.value;  // <-- declare user as Partial<User>
  
    try {
      if (user.id) {
        await lastValueFrom(this.userService.updateUser(user as User)); // <-- cast user to User
        this.successMessage = 'User updated successfully.';
      } else {
        const insertedUser = await lastValueFrom(this.userService.createUser(user as User)); // <-- cast user to User
        this.successMessage = 'User is inserted with id ' + insertedUser.id;
      }
      this.showNewUser = false;
    } catch (err: any) {
      this.errorMessage = err;
    }
  }


}
