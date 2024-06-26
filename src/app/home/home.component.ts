import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from '../models/expense';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  displayedColumns: string[] = ["date", "description", "amount", "delete"];
  dataSource!: MatTableDataSource<Expense>;
  inflow: number = 0;
  outflow: number = 0;
  balance: number = 0;
  selectedMonth = new Date().getMonth();

  constructor(private router: Router) { }

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.fetchExpensesFromLocalStorage();
    this.dataSource = new MatTableDataSource(this.expenses);
  }

  fetchExpensesFromLocalStorage(): void {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    this.expenses = storedExpenses.map((expenseJSON: string) => {
      const { date, description, amount } = JSON.parse(expenseJSON);
      return new Expense(new Date(date), description, amount);
    });
  }

  updateMonthSelection(selectedMonth: number): void {
    this.selectedMonth = selectedMonth;
    this.inflow = 0;
    this.outflow = 0;
    this.balance = 0;

    this.filteredExpenses = this.expenses.filter(expense => {
      if (expense.date.getMonth() == selectedMonth) {
        if (expense.amount > 0) this.inflow += expense.amount;
        else {
          this.outflow += expense.amount;
        }
        return true;
      }
      return false;
    })
    this.balance = this.inflow + this.outflow;
    this.dataSource.data = this.filteredExpenses;
  }

  addEntry() {
    this.router.navigate(['/expenses-entry']);
  }

  confirmDialog(prompt: string) {
    const confirm = window.confirm(prompt);
    return confirm;
  }

  deleteExpense(expense: Expense) {
    const confirm = this.confirmDialog("Are you sure you want to delete this item?");
    if (!confirm) return;

    // Find the index of the expense in the expenses array
    const index = this.expenses.indexOf(expense);
    if (index !== -1) {
      // Remove the expense from the expenses array
      this.expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(this.expenses));
      // Update display
      this.updateMonthSelection(this.selectedMonth);
      // Update the MatTableDataSource with the modified expenses array
      this.dataSource.data = this.expenses;
    }
  }


}
