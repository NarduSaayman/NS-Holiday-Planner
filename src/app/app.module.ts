import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { CalendarComponent } from './components/my-trips/trip/calendar/calendar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { environment } from '../environments/environment';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';

import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import * as fromExchange from './store/exchange/exchange.reducer';
import * as fromTrip from './store/trip/trip.reducer';
import { SharedModule } from './shared/shared/shared.module';
import { NgZorroModule } from './shared/ng-zorro/ng-zorro.module';
import { FirebaseModule } from './shared/firebase/firebase.module';
import { TripEffects } from './store/trip/trip.effects';
import { ExchangeEffects } from './store/exchange/exchange.effects';
import * as fromUser from './store/user/user.reducer';
import { TripComponent } from './components/my-trips/trip/trip.component';
import { TripFormComponent } from './components/my-trips/trip-form/trip-form.component';
import { ItineraryFormComponent } from './components/my-trips/trip/itinerary-form/itinerary-form.component';
import { ItineraryItemComponent } from './components/my-trips/trip/itinerary-item/itinerary-item.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    CalendarComponent,
    NotFoundComponent,
    HomeComponent,
    VerifyEmailComponent,
    MyTripsComponent,
    TripComponent,
    TripFormComponent,
    ItineraryFormComponent,
    ItineraryItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //http
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([TripEffects, ExchangeEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forFeature(
      fromExchange.exchangeFeatureKey,
      fromExchange.reducer
    ),
    StoreModule.forFeature(fromTrip.tripFeatureKey, fromTrip.reducer),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    SharedModule,
    NgZorroModule,
    FirebaseModule,
  ],
  providers: [AuthService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
