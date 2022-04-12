import { Injectable, NgZone } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import firebase from 'firebase/compat';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.parse(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  Register(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationEmail();
        this.SetUserData(result.user);
      })
      .catch((err: Error) => {
        // Add user alert on error
        console.error(err.message);
      });
  }

  Login(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['my-trips']);
        });
        this.SetUserData(result.user);
      })
      .catch((err: Error) => {
        // Add user alert on error
        console.error(err.message);
      });
  }

  ForgorPassword(passwordResetEmail: string) {
    return this.firebaseAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          `Sent password reset mail to ${passwordResetEmail}, please check your inbox`
        );
      })
      .catch((err: Error) => {
        // add user alert on error
        console.error(err.message);
      });
  }

  get isLoggedIn(): boolean {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    return !!user && user.emailVerified;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider: firebase.auth.AuthProvider) {
    return this.firebaseAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['my-trips']);
        });
        this.SetUserData(result.user);
      })
      .catch((err: Error) => {
        // Add user alert on error
        console.log(err.message);
      });
  }

  SendVerificationEmail() {
    return this.firebaseAuth.currentUser.then((user) =>
      user
        ?.sendEmailVerification()
        .then(() => this.router.navigate(['verify-email']))
    );
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, { merge: true });
  }

  Logout() {
    return this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
