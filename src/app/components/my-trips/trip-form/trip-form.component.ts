import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trip } from 'src/app/models/trip';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripFormComponent {
  private localTrip!: Trip | null;
  isExistingTrip = false;

  @Input() set formTrip(trip: Trip | null) {
    this.localTrip = trip;
    if (!!trip?.tripID) {
      this.isExistingTrip = true;
      this.newTripForm = this.fb.group({
        tripName: [trip.name, [Validators.required]],
        tripLocation: [trip.location || ''],
        tripDescription: [trip.description || ''],
      });
    } else {
      this.isExistingTrip = false;
      this.newTripForm = this.fb.group({
        tripName: ['', [Validators.required]],
        tripLocation: [''],
        tripDescription: [''],
      });
    }
  }

  @Output() upsertTrip = new EventEmitter<Trip>();

  newTripForm: FormGroup;

  emitTrip(): void {
    console.log('submit', this.newTripForm.value);
    const newTrip: Trip = {
      name: this.newTripForm.controls['tripName'].value,
      location: this.newTripForm.controls['tripLocation'].value,
      description: this.newTripForm.controls['tripDescription'].value,
      itinerary: this.localTrip?.itinerary || [],
      userID: this.localTrip?.userID || '',
      tripID: this.localTrip?.tripID || '',
      totalCost: 0,
    };
    this.upsertTrip.emit(newTrip);
  }

  constructor(private fb: FormBuilder) {
    this.newTripForm = this.fb.group({
      tripName: ['', [Validators.required]],
      tripLocation: [''],
      tripDescription: [''],
    });
  }
}
