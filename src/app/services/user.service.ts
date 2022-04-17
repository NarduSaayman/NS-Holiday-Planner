import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from '@firebase/util';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth
  ) {}

  async addUserTrip(trip: Trip) {
    this.firestore.collection('Trips').add({
      ...trip,
      userID: await this.firebaseAuth.currentUser.then((user) => user?.uid),
      tripID: this.firestore.createId(),
    });
  }

  async updateUserTrip(trip: Trip, tripID: string) {
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

  getUserTrips(): Observable<Trip[]> {
    const userID = this.firebaseAuth.currentUser.then((user) => user?.uid);
    const userCollection = this.firestore.collection<Trip>('Trips', (ref) =>
      ref.where('userID', '==', userID)
    );
    const userTrips$ = userCollection.valueChanges();

    return userTrips$;
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
