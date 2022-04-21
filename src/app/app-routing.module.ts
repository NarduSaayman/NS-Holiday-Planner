import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/my-trips/trip/calendar/calendar.component';
import { HomeComponent } from './components/home/home.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { TripFormComponent } from './components/my-trips/trip-form/trip-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { TripComponent } from './components/my-trips/trip/trip.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'my-trips', component: MyTripsComponent },
  { path: 'trip-form', component: TripFormComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'itenarary', component: CalendarComponent },
  { path: 'trip', component: TripComponent },
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
