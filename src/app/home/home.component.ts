import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from '../models/expense';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  expenses: Expense[] = [];
  displayedColumns: string[] = ["date", "description", "amount", "delete"];
  dataSource!: MatTableDataSource<Expense>;

  date = new FormControl(new Date());

  constructor(private router: Router) { }

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
      // Update the MatTableDataSource with the modified expenses array
      this.dataSource.data = this.expenses;
    }
  }

  setMonthAndYear(event: any, datepicker: MatDatepicker<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.date.setValue(selectedDate);
    }
    datepicker.close();
  }
}
