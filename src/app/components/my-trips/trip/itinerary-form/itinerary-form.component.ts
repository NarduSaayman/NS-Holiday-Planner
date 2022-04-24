import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { max, Observable, takeUntil } from 'rxjs';
import { ItineraryItem, Tag, Trip } from 'src/app/models/trip';
import { addTrip, updateTrip } from 'src/app/store/trip/trip.actions';
import { TripState } from 'src/app/store/trip/trip.reducer';
import { selectSelectedTrip } from 'src/app/store/trip/trip.selectors';

@Component({
  selector: 'app-itinerary-form',
  templateUrl: './itinerary-form.component.html',
  styleUrls: ['./itinerary-form.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('0.2s ease-out', style({ opacity: 1, height: 100 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s ease-in', style({ opacity: 0, height: 0 })),
      ]),
    ]),
  ],
})
export class ItineraryFormComponent {
  private localItinItem!: ItineraryItem | null;
  isExistingItem = false;
  tag!: Tag;

  @Input() set formItinItem(itinItem: ItineraryItem | null) {
    this.localItinItem = itinItem;
    if (!!itinItem)
      if (itinItem?.name?.length > 0) {
        this.isExistingItem = true;
        this.itineraryItemForm = this.fb.group({
          itinItemName: [itinItem.name, [Validators.required]],
          itinItemDescription: [itinItem.description || ''],
          itinItemTag: [itinItem.tag || Tag.DESTINATION],
          itinItemStartEndTime: [
            [
              new Date(itinItem?.startEndTime?.startDate),
              new Date(
                itinItem?.startEndTime?.endDate ||
                  itinItem?.startEndTime?.startDate
              ),
            ],
            [Validators.required],
          ],
          itinItemCostEstimate: [itinItem.costEstimate || 0],
          startLocation: [itinItem.startLocation || ''],
          endLocation: [itinItem.endLocation || ''],
          itinItemNotes: [itinItem.notes || ''],
        });
      } else {
        this.isExistingItem = false;
        this.itineraryItemForm = this.fb.group({
          itinItemName: ['', [Validators.required]],
          itinItemDescription: [''],
          itinItemTag: [Tag.DESTINATION],
          itinItemStartEndTime: ['', [Validators.required]],
          itinItemCostEstimate: [0],
          startLocation: [''],
          endLocation: [''],
          itinItemNotes: [''],
        });
      }
  }

  @Output() upsertItineraryItem = new EventEmitter<ItineraryItem>();

  itineraryItemForm: FormGroup;
  radioValue = 'destination';

  emitItineraryItem(): void {
    console.log('submit', this.itineraryItemForm.value);
    const newItineraryItem: ItineraryItem = {
      name: this.itineraryItemForm.controls['itinItemName'].value,
      description: this.itineraryItemForm.controls['itinItemDescription'].value,
      tag: this.itineraryItemForm.controls['itinItemTag'].value, // Destination or Travel
      startEndTime: {
        startDate:
          this.itineraryItemForm.controls['itinItemStartEndTime'].value[0],
        endDate:
          this.itineraryItemForm.controls['itinItemStartEndTime'].value[1] ||
          '',
      },
      costEstimate:
        this.itineraryItemForm.controls['itinItemCostEstimate'].value,
      notes: this.itineraryItemForm.controls['itinItemNotes'].value,
    };
    console.log('newItineraryItem:', newItineraryItem);
    this.upsertItineraryItem.emit(newItineraryItem);
  }

  constructor(private fb: FormBuilder, private tripStore: Store<TripState>) {
    this.itineraryItemForm = this.fb.group({
      itinItemName: ['', [Validators.required]],
      itinItemDescription: [''],
      itinItemTag: [Tag.DESTINATION],
      itinItemStartEndTime: ['', [Validators.required]],
      itinItemCostEstimate: [0],
      startLocation: [''],
      endLocation: [''],
      itinItemNotes: [''],
    });
  }
}
