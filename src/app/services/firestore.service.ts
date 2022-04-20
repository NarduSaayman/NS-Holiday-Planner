import { Injectable } from '@angular/core';
import { ItineraryItem, Trip } from '../models/trip';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EMPTY, from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth
  ) {}

  addUserTrip(trip: Trip): Observable<DocumentReference<Trip>> {
    return from(this.firebaseAuth.currentUser.then((user) => user?.uid)).pipe(
      mergeMap((uid) => {
        if (uid) {
          return from(
            this.firestore.collection<Trip>('Trips').add({
              ...trip,
              userID: uid,
              tripID: this.firestore.createId(),
            })
          );
        }
        return EMPTY;
      })
    );
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
