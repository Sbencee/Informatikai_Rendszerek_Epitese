import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Loans } from '../../models/loans.model';
import { LoansService } from '../../services/loans.service';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})
export class LoanFormComponent implements OnInit {
  loanForm!: FormGroup;
  loanId: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loansService: LoansService
  ) {
    this.loanId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.initLoanForm();
    this.loadLoan();
  }

  initLoanForm(): void {
    this.loanForm = this.formBuilder.group({
      issueDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  loadLoan(): void {
    this.loansService.getLoan(this.loanId).then(
      (loan: Loans) => {
        this.loanForm.patchValue(loan);
      },
      (error) => {
        console.log(error); // Handle error appropriately
      }
    );
  }
  

  submitLoan(): void {
    if (this.loanForm.invalid) {
      return;
    }

    const loanData = this.loanForm.value;
    this.loansService.updateLoan(this.loanId, loanData).subscribe(
      () => {
        // Handle success (e.g., display success message, navigate back to the loans list)
        this.router.navigate(['/loans']);
      },
      (error) => {
        console.log(error); // Handle error appropriately
      }
    );
  }
}
