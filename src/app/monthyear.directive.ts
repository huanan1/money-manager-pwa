import { Directive } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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

@Directive({
  selector: '[appMonthyear]',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MMMYYYY },
  ]
})
export class MonthyearDirective {

  constructor() { }

}
