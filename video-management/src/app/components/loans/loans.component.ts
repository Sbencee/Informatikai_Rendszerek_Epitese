import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loans } from '../../models/loans.model';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  @Input() loan!: Loans;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLoanForm(id: number) {
    this.router.navigate(['loans', id]);
  }

}
