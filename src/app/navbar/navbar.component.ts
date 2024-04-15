import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';


export const MMMYYYY = {
  parse: {
    dateInput: "MMM YYYY",
  },
  display: {
    dateInput: "MMM YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isHomePage: boolean = true;
  @Output() monthSelected = new EventEmitter<number>();

  constructor(private router: Router) { }

  date = new FormControl(moment());

  goBack(): void {
    this.router.navigate([""])
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.monthSelected.emit(normalizedMonthAndYear.month());
    datepicker.close();
  }
}
