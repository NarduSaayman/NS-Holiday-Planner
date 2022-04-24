import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ItineraryItem, Tag, Trip } from 'src/app/models/trip';
import { TripState } from 'src/app/store/trip/trip.reducer';
import { selectSelectedTrip } from 'src/app/store/trip/trip.selectors';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();
  selectedTrip$: Observable<Trip>;
  currentTrip!: Trip;
  itinerary!: ItineraryItem[];

  constructor(private tripStore: Store<TripState>) {
    this.selectedTrip$ = tripStore.pipe(select(selectSelectedTrip));
  }

  trackItineraryItem(index: number, itinerary: ItineraryItem) {
    return itinerary.name + itinerary.startEndTime.startDate + index;
  }

  ngOnInit(): void {
    this.selectedTrip$.pipe(takeUntil(this.destroy$)).subscribe((trip) => {
      this.currentTrip = trip;
      this.itinerary = trip?.itinerary;
      // this.itinerary = [
      //   {
      //     name: 'Test',
      //     costEstimate: 100,
      //     tag: Tag.DESTINATION,
      //     startEndTime: { startDate: new Date() },
      //   },
      //   {
      //     name: 'Test2',
      //     costEstimate: 1200,
      //     tag: Tag.TRAVEL,
      //     startEndTime: {
      //       startDate: new Date(new Date().setHours(new Date().getHours() + 4)),
      //     },
      //   },
      // ];
    });
  }

  getItinDate(date: Date) {
    console.log('date:', date);
    return new Date(date).getDate();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
