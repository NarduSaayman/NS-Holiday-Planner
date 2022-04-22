import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTripsRoutingModule } from './my-trips-routing.module';
import { MyTripsComponent } from './my-trips.component';
import { NgZorroModule } from 'src/app/shared/ng-zorro/ng-zorro.module';
import { TripFormComponent } from './trip-form/trip-form.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from 'src/app/icons-provider.module';

@NgModule({
  declarations: [MyTripsComponent, TripFormComponent],
  imports: [
    CommonModule,
    MyTripsRoutingModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
  ],
})
export class MyTripsModule {}
