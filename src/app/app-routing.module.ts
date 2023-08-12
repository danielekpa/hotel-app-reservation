import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'list', component: ReservationListComponent
  },
  {
    path: 'new', component: ReservationFormComponent
  },
  {
    path: 'edit/:id', component: ReservationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
