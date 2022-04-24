import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryItemComponent } from './itinerary-item.component';

describe('ItineraryComponent', () => {
  let component: ItineraryItemComponent;
  let fixture: ComponentFixture<ItineraryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItineraryItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
