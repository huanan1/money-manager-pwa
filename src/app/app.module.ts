import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSortModule } from '@angular/material/sort';
import { MonthyearDirective } from './monthyear.directive';
import { FulldateDirective } from './fulldate.directive';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseEntryComponent,
    HomeComponent,
    NavbarComponent,
    MonthyearDirective,
    FulldateDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [
    MatDatepickerModule, MatNativeDateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
