import { Injectable, NgZone } from '@angular/core';
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
  userData!: User | null;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = {
          ...user,
          email: user.email || '',
          photoURL: user.photoURL || '',
          displayName: user.displayName || '',
        };
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
        this.userData = null;
      }
    });
  }

  register(email: string, password: string) {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationEmail();
        if (!!result?.user) {
          const user = {
            uid: result.user.uid,
            email: result.user.email || '',
            displayName: result.user.displayName || '',
            photoURL: result.user.photoURL || '',
            emailVerified: result.user.emailVerified,
          };
          this.fireStore.collection('Users').add({ ...user });
        }
      })
      .catch((err: Error) => {
        // Add user alert on error
        console.error(err.message);
      });
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['my-trips']);
        });
      })
      .catch((err: Error) => {
        // Add user alert on error
        console.error(err.message);
      });
  }

  forgotPassword(passwordResetEmail: string) {
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
    return !!user;
  }

  get isVerified(): boolean {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    return !!user && user.emailVerified;
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  authLogin(provider: firebase.auth.AuthProvider) {
    return this.firebaseAuth
      .signInWithPopup(provider)
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['my-trips']);
        });
      })
      .catch((err: Error) => {
        // Add user alert on error
        console.log(err.message);
      });
  }

  sendVerificationEmail() {
    return this.firebaseAuth.currentUser.then((user) =>
      user
        ?.sendEmailVerification()
        .then(() => this.router.navigate(['verify-email']))
    );
  }

  logout() {
    return this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
