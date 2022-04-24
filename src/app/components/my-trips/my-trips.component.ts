import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/models/trip';
import {
  addTrip,
  deleteTrip,
  deleteTripByID,
  getTrips,
  setSelectedTrip,
  updateTrip,
} from 'src/app/store/trip/trip.actions';
import { TripState } from 'src/app/store/trip/trip.reducer';
import { selectTrips } from 'src/app/store/trip/trip.selectors';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss'],
})
export class MyTripsComponent implements OnInit {
  userTrips$: Observable<Trip[]>;

  tripToEdit!: Trip | null;

  showTripForm = false;

  constructor(private tripStore: Store<TripState>, private router: Router) {
    this.userTrips$ = tripStore.pipe(select(selectTrips));
  }

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips() {
    this.tripStore.dispatch(getTrips());
  }

  upsertTrip(trip: Trip) {
    if (trip?.tripID?.length > 0) {
      this.tripStore.dispatch(updateTrip({ updatedTrip: trip }));
    } else this.tripStore.dispatch(addTrip({ newTrip: trip }));
    this.showTripForm = false;
  }

  editTrip(trip: Trip) {
    this.tripToEdit = trip;
    this.showTripForm = true;
  }

  addTrip() {
    this.tripToEdit = null;
    this.showTripForm = true;
  }

  deleteTrip(trip: Trip) {
    this.tripStore.dispatch(deleteTrip({ tripToDelete: trip }));
  }

  viewTrip(trip: Trip) {
    this.tripStore.dispatch(setSelectedTrip({ selectedTrip: trip }));
    this.router.navigate([`trip`]);
  }

  handleCancel() {
    this.tripToEdit = null;
    this.showTripForm = false;
  }

  trackTrip(index: number, trip: Trip) {
    return trip.tripID;
  }
}
