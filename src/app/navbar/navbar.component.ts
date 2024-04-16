import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isHomePage: boolean = true;
  @Output() monthSelected = new EventEmitter<number>();
  date = new FormControl(moment());

  constructor(private router: Router) { }


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
