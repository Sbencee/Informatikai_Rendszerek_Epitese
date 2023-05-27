import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../../models/videos.model';
import { Loans } from '../../models/loans.model';
import { User } from '../../models/user.model';
import { VideoService } from '../../services/video.service';
import { LoansService } from '../../services/loans.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.css']
})
export class LoansListComponent implements OnInit {
  
  date: Date = new Date();

  loans: Loans[] = [];
  successMessage = '';
  errorMessage = '';
  users!: User[];
  video!: Video[];
  showNewLoan:boolean=false;
  NewLoan:boolean=false;
  ModifyLoan:boolean=false;
  query: string = '';
  unamePattern = /^\d{4}\-\d{2}\-\d{2}$/;

  loanForm = this.formBuilder.group({
    id: [0],
    issueDate: [this.date.getFullYear()+'-'+this.date.getMonth()+'-'+this.date.getDate(), Validators.pattern(this.unamePattern)],
    dueDate: ['', Validators.pattern(this.unamePattern)],
    returnDate: ['', Validators.pattern(this.unamePattern)],
    status: ['Active'],
    loaners: [null],
    videos: [this.video]
}); 



  constructor(private formBuilder: FormBuilder, private loanService: LoansService,
    private userService: UserService,
    private videoService: VideoService,
    private activatedRouter: ActivatedRoute) { }

  showTag(modify: boolean) {
    this.showNewLoan = true;
    if (modify)
      this.ModifyLoan = true;
    else
      this.NewLoan = true;
  }

  async ngOnInit() {
    try {
      this.userService.getUsers().subscribe(
        users => {
          this.users = users;
          console.log(this.users);
        },
        error => {
          console.error(error);
        }
      );
      this.video = await this.videoService.getvideos();
      this.loans = await this.loanService.getLoans();
      const id = this.activatedRouter.snapshot.paramMap.get('id');
      if (id) {
        const loan = await this.loanService.getLoan(parseInt(id));
        this.loanForm.setValue({
            ...loan,
            issueDate: loan.issueDate.toISOString().slice(0, 10),
            dueDate: loan.dueDate.toISOString().slice(0, 10),
            returnDate: loan.returnDate ? loan.returnDate.toISOString().slice(0, 10) : ''
        });
    }
    
      console.log(this.loans);
    } catch(err) {
      console.error(err);
    }
  }

  get issueDate() {
    return this.loanForm.controls['issueDate'];
  }
  get dueDate() {
    return this.loanForm.controls['dueDate'];
  }
  get returnDate() {
    return this.loanForm.controls['returnDate'];
  }
  get status() {
    return this.loanForm.controls['status'];
  }
  get loaners() {
    return this.loanForm.controls['loaners'];
  }
  get videos() {
    return this.loanForm.controls['videos'];
  }
  

  async insertNewLoan() {
    const loanFormValue = this.loanForm.value;
    const loans = {
      ...loanFormValue,
      issueDate: new Date(loanFormValue.issueDate),
      dueDate: new Date(loanFormValue.dueDate),
      returnDate: loanFormValue.returnDate ? new Date(loanFormValue.returnDate) : null
    };
    try {
      if (loans.id) {
        await this.loanService.updateLoan(loans.id, loans).toPromise();
        this.successMessage = 'Loan updated successfully';
        this.ModifyLoan = false;
      } else {
        const insertedProduct = await this.loanService.createLoan(loans);
        console.log(insertedProduct);
        this.successMessage = 'Loan is inserted with id ' + insertedProduct.id;
        this.NewLoan = false;
      }
  
      this.showNewLoan = false;
    } catch(err: any) {
      this.errorMessage = err.error.message;
    }
  }
  
  

}
