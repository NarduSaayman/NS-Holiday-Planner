import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { EMPTY, from, map, Observable } from 'rxjs';
import {
  AngularFirestore,
  DocumentChangeAction,
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

  updateUserTrip(trip: Trip, docID: string): Observable<void> {
    if (docID?.length === 0) return EMPTY;
    return from(
      this.firestore
        .collection('Trips')
        .doc(docID)
        .update({ ...trip })
    );
  }

  getTripDocID(trip: Trip): Observable<string | null> {
    if (trip?.tripID) {
      return this.firestore
        .collection<Trip>('Trips', (ref) =>
          ref.where('tripID', '==', trip.tripID).limit(1)
        )
        .snapshotChanges()
        .pipe(
          map((DocAction: DocumentChangeAction<Trip>[]) => {
            if (DocAction.length === 0) return null;
            return DocAction[0].payload.doc.id;
          })
        );
    } else return EMPTY;
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

  deleteUserTrip(docID: string): Observable<void> {
    if (docID?.length === 0) return EMPTY;
    return from(this.firestore.collection('Trips').doc(docID).delete());
  }
}
