import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { EMPTY, from, Observable } from 'rxjs';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  addUserTrip(trip: Trip, userID: string): Observable<DocumentReference<Trip>> {
    if (userID) {
      console.log('trip:', trip);
      return from(
        this.firestore.collection<Trip>('Trips').add({
          ...trip,
          userID,
          tripID: this.firestore.createId(),
        })
      );
    }
    return EMPTY;
  }

  updateUserTrip(trip: Trip): Observable<void> {
    if (trip?.tripID) {
      const tripToUpdate = this.firestore.collection<Trip>('Trips', (ref) =>
        ref.where('tripID', '==', trip.tripID)
      );
      tripToUpdate.snapshotChanges().subscribe((res) => {
        let id = res[0].payload.doc.id;
        return from(
          this.firestore.collection<Trip>('Trips').doc(id).update(trip)
        );
      });
    }
    return EMPTY;
  }

  getUserTrips(userID: string): Observable<Trip[]> {
    if (userID) {
      const userCollection = this.firestore.collection<Trip>('Trips', (ref) =>
        ref.where('userID', '==', userID)
      );
      return userCollection.valueChanges();
    }

    return EMPTY;
  }

  deleteUserTrip(trip: Trip): Observable<void> {
    if (trip?.tripID) {
      const tripToUpdate = this.firestore.collection<Trip>('Trips', (ref) =>
        ref.where('tripID', '==', trip.tripID)
      );
      tripToUpdate.snapshotChanges().subscribe((res) => {
        let id = res[0].payload.doc.id;
        return from(this.firestore.collection<Trip>('Trips').doc(id).delete());
      });
    }
    return EMPTY;
  }
}
