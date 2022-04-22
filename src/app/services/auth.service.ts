import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as auth from 'firebase/auth';
import firebase from 'firebase/compat';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from '../models/user';
import { setCurrentUser } from '../store/user/user.actions';
import { UserState } from '../store/user/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData!: User | null;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone,
    private userStore: Store<UserState>,
    private notificationService: NzNotificationService
  ) {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = {
          uid: user.uid,
          email: user.email || '',
          photoURL: user.photoURL || '',
          displayName: user.displayName || '',
          emailVerified: user.emailVerified,
        };
        this.userStore.dispatch(setCurrentUser({ user: this.userData }));
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        this.userStore.dispatch(setCurrentUser({ user: null }));
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
        this.notificationService.error(
          `Sorry, couldn't register your account.`,
          err.toString(),
          { nzDuration: 0 }
        );
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
        this.notificationService.error(
          `Sorry, couldn't log you in.`,
          err.toString(),
          { nzDuration: 0 }
        );
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
        this.notificationService.error(
          `Sorry, couldn't reset your password. Please try again.`,
          err.toString(),
          { nzDuration: 0 }
        );
        console.error(err.message);
      });
  }

  get isLoggedIn(): boolean {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.userStore.dispatch(setCurrentUser({ user }));
    return !!user;
  }

  get isVerified(): boolean {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.userStore.dispatch(setCurrentUser({ user }));
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
        this.notificationService.error(
          `Sorry, couldn't log you in.`,
          err.toString(),
          { nzDuration: 0 }
        );
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
      this.userStore.dispatch(setCurrentUser({ user: null }));
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
