import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  expenses: Expense[] = [];
  displayedColumns: string[] = ["date", "description", "amount"];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fetchExpensesFromLocalStorage();
  }

  fetchExpensesFromLocalStorage(): void {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    this.expenses = storedExpenses.map((expenseJSON: string) => {
      const { date, description, amount } = JSON.parse(expenseJSON);
      return new Expense(new Date(date), description, amount);
    });

  }

  addEntry() {
    this.router.navigate(['/expenses-entry']);
  }
}
