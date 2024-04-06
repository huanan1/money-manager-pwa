import { Component, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.scss'],
})
export class ExpenseEntryComponent {
  expenseDescription: string = '';
  currentInput: string = '';
  displayCalculator: boolean = false;
  INFLOW = "inflow";
  OUTFLOW = "outflow";
  activeBtn: string = this.INFLOW;
  selectedDate: Date = new Date();
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  EXPENSES_KEY = "expenses";


  constructor(private router: Router) { }

  submitExpense(): void {
    // Logic to submit expense entry
    // You can call a service to save the expense data

    let valid = this.verifyFields();
    if (!valid) return;

    let amount = parseFloat(this.currentInput);
    if (this.activeBtn === this.OUTFLOW) {
      amount = -1 * amount;
    }
    const expense = new Expense(this.selectedDate, this.expenseDescription, amount);
    let expenses: string[] = JSON.parse(localStorage.getItem(this.EXPENSES_KEY) || "[]");
    expenses.push(expense.toJSON());
    localStorage.setItem(this.EXPENSES_KEY, JSON.stringify(expenses));

    this.currentInput = '';
    this.router.navigate(['']);
  }

  verifyFields(): boolean {
    if (this.calculate() && this.selectedDate != null) return true;
    return false;
  }

  showCalculator(): void {
    this.displayCalculator = !this.displayCalculator;
  }

  handleButtonClick(value: string) {
    if (value === "d") {
      // Remove the last character from the current input if it's not empty
      if (this.currentInput.length > 0) {
        this.currentInput = this.currentInput.slice(0, -1);
      }
    }
    else if (value === '=') {
      this.calculate(); // Perform calculation
    } else {
      this.currentInput += value; // Append the clicked button value
    }

  }

  calculate(): boolean {
    try {
      if (isNaN(eval(this.currentInput))) {
        console.log(this.currentInput + " is not a number");
        this.currentInput = "";
        return false;
      }
    } catch (error) {
      console.error(this.currentInput + " cannot be evaluated");
      this.currentInput = "";
      return false;
    }

    this.currentInput = eval(this.currentInput); // Evaluate the expression
    return true;
  }

  toggleBtn(btn: string) {
    if (this.activeBtn === btn) {
      // already active
      return;
    }
    this.activeBtn = btn; // Set active button
  }
}
