import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
  constructor(private router: Router,
              private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
          this.store.dispatch(new AuthActions.SignUp());
        this.router.navigate(['/recipes']);
          firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
              this.store.dispatch(new AuthActions.SetToken(token));
            });
      })
      .catch(err => alert(err.message));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.store.dispatch(new AuthActions.SignIn());
        this.router.navigate(['/recipes']);
        firebase.auth().currentUser.getIdToken()
          .then((token: string) => {
            this.store.dispatch(new AuthActions.SetToken(token));
          });
      })
      .catch(err => alert(err.message));
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/signin']);
  }
  // getToken() {
  //   firebase.auth().currentUser.getIdToken()
  //     .then((token: string) => this.token = token);
  //   return  this.token;
  // }
  // isAuthenticated() {
  //   return this.token != null;
  // }
}
