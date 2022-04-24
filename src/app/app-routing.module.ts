import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/my-trips/trip/calendar/calendar.component';
import { HomeComponent } from './components/home/home.component';
import { TripFormComponent } from './components/my-trips/trip-form/trip-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { TripComponent } from './components/my-trips/trip/trip.component';
import { CanAccessGuard } from './guards/can-access.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./components/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailModule
      ),
  },
  {
    path: 'my-trips',
    loadChildren: () =>
      import('./components/my-trips/my-trips.module').then(
        (m) => m.MyTripsModule
      ),
    canActivate: [CanAccessGuard],
  },
  { path: 'trip', component: TripComponent, canActivate: [CanAccessGuard] },
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
