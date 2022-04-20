import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/models/trip';
import { addTrip, getTrips } from 'src/app/store/trip/trip.actions';
import { TripState } from 'src/app/store/trip/trip.reducer';
import { selectTrips } from 'src/app/store/trip/trip.selectors';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss'],
})
export class MyTripsComponent implements OnInit {
  userTrips$: Observable<Trip[]>;

  constructor(private tripStore: Store<TripState>) {
    this.userTrips$ = tripStore.pipe(select(selectTrips));
  }

  newTrip: Trip = {
    name: 'Trip2',
    itinerary: [],
    startEndDate: { startDate: new Date() },
    userID: '',
    tripID: '',
  };

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips() {
    this.tripStore.dispatch(getTrips());
  }

  addTrip() {
    this.tripStore.dispatch(addTrip({ newTrip: this.newTrip }));
  }
}
