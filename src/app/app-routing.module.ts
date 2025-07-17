import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BooksComponent } from './components/books/books.component';
import { MembersComponent } from './components/members/members.component';
import { LoansComponent } from './components/loans/loans.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ActivitylogComponent } from './components/activitylog/activitylog.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'books', component: BooksComponent },
  { path: 'members', component: MembersComponent },
  { path: 'loans', component: LoansComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'activityLog', component: ActivitylogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
