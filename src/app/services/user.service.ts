import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EMPTY, from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
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

  updateUserTrip(trip: Trip, tripID: string) {
    const tripToUpdate = this.firestore.collection<Trip>('Trips', (ref) =>
      ref.where('tripID', '==', tripID)
    );

    tripToUpdate.snapshotChanges().subscribe((res) => {
      let id = res[0].payload.doc.id;
      this.firestore
        .collection<Trip>('Trips')
        .doc(id)
        .update({ ...trip });
    });
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

  getUserTrip(tripID: string): Observable<Trip[]> {
    const userID = this.firebaseAuth.currentUser.then((user) => user?.uid);
    const userCollection = this.firestore.collection<Trip>('Trips', (ref) =>
      ref.where('tripID', '==', tripID)
    );
    const userTrip$ = userCollection.valueChanges();

    return userTrip$;
  }

  deleteUserTrip() {}

  addItinerary() {}

  updateItinerary() {}

  getItinerary() {}

  deleteItinerary() {}

  getItineraries() {}
}
