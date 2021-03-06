import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ItineraryItem, Trip } from 'src/app/models/trip';
import {
  addTrip,
  setSelectedTrip,
  updateTrip,
} from 'src/app/store/trip/trip.actions';
import { TripState } from 'src/app/store/trip/trip.reducer';
import { selectSelectedTrip } from 'src/app/store/trip/trip.selectors';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();
  selectedTrip$: Observable<Trip>;

  tripToEdit!: Trip | null;
  itinItemToEdit!: ItineraryItem | null;

  showItinItemForm = false;

  constructor(private tripStore: Store<TripState>) {
    this.selectedTrip$ = tripStore.pipe(select(selectSelectedTrip));
  }

  ngOnInit(): void {
    //clean up subscirbe
    this.selectedTrip$.pipe(takeUntil(this.destroy$)).subscribe((trip) => {
      this.tripToEdit = JSON.parse(JSON.stringify(trip));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  upsertItineraryItem(itinItem: ItineraryItem) {
    if (!this.tripToEdit) return;
    if (itinItem && this.itinItemToEdit) {
      console.log('Item Exists');
      this.tripToEdit?.itinerary.push(itinItem);
    }

    this.tripToEdit?.itinerary.push(itinItem);
    this.tripStore.dispatch(updateTrip({ updatedTrip: this.tripToEdit }));
    this.tripStore.dispatch(setSelectedTrip({ selectedTrip: this.tripToEdit }));

    this.showItinItemForm = false;
  }

  addItinItem() {
    this.itinItemToEdit = null;
    this.showItinItemForm = true;
  }

  editItinItem(itinItem: ItineraryItem) {
    this.itinItemToEdit = itinItem;
    this.showItinItemForm = true;
  }

  handleCancel() {
    this.itinItemToEdit = null;
    this.showItinItemForm = false;
  }

  removeItinItem(itinItem: ItineraryItem) {
    if (!this.tripToEdit?.itinerary) return;
    const filteredItin = this.tripToEdit?.itinerary.filter(
      (i) =>
        i.startEndTime.startDate !== itinItem.startEndTime.startDate &&
        i.name !== itinItem.name
    );

    this.tripToEdit.itinerary = filteredItin;

    this.tripStore.dispatch(updateTrip({ updatedTrip: this.tripToEdit }));
    this.tripStore.dispatch(setSelectedTrip({ selectedTrip: this.tripToEdit }));

    this.tripToEdit.itinerary = filteredItin;
  }

  trackItineraryItem(index: number, itinerary: ItineraryItem) {
    return itinerary.name + itinerary.startEndTime.startDate + index;
  }
}
