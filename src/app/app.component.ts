import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserState } from './store/user/user.reducer';
import { selectCurrentUser } from './store/user/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private userStore: Store<UserState>
  ) {
    this.isLoggedIn$ = userStore.pipe(
      select(selectCurrentUser),
      map((user) => !!user?.uid)
    );
  }

  logout() {
    this.authService.logout();
  }
}
