import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
@Injectable()
export class AuthService {
  token: string;
  constructor(private router: Router) {
  }
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.getIdToken()
          .then((token: string) => {
            this.token = token;
            this.router.navigate(['/recipes']);
          });
      })
      .catch(err => alert(err.message));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.getIdToken()
          .then((token: string) => {
            this.token = token;
            this.router.navigate(['/recipes']);
          });
      })
      .catch(err => alert(err.message));
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/signin']);
    this.token = null;
  }
  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => this.token = token);
    return  this.token;
  }
  isAuthenticated() {
    return this.token != null;
  }
}
