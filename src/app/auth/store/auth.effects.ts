import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import { pipe , from} from 'rxjs';
import {map, switchMap, mergeMap, tap} from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$
    .pipe(
      ofType(AuthActions.TRY_SIGNUP),
      pipe(map((action: AuthActions.TrySignUp) => {
            return action.payload;
          }),
          switchMap((authdata: {username: string, password: string}) => {
            return from(firebase.auth().createUserWithEmailAndPassword(authdata.username, authdata.password));
          }),
          switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
          }),
          pipe(mergeMap((token: string) => {  //  mergeMap to merge 2 observables
            this.router.navigate(['/recipes']);
            return [
                {
                  type: AuthActions.SIGNUP
                },
                {
                  type: AuthActions.SET_TOKEN,
                  payload: token
                }
              ];
            })
          )
        )
      );
  @Effect()
  authSignIn = this.actions$
    .pipe(
      ofType(AuthActions.TRY_SIGNIN),
      pipe(map((action: AuthActions.TrySignIn) => {
          return action.payload;
        }),
        switchMap((authdata: {username: string, password: string}) => {
          return from(firebase.auth().signInWithEmailAndPassword(authdata.username, authdata.password));
        }),
        switchMap(() => {
          return from(firebase.auth().currentUser.getIdToken());
        }),
        pipe(mergeMap((token: string) => {  //  mergeMap to merge 2 observables
          this.router.navigate(['/recipes']);
          return [
              {
                type: AuthActions.SIGNIN
              },
              {
                type: AuthActions.SET_TOKEN,
                payload: token
              }
            ];
          })
        )
      )
    );

  @Effect({dispatch: false})
  authLogout = this.actions$
    .pipe(
      ofType(AuthActions.LOGOUT),
      tap(() => this.router.navigate(['/']))
    );
  constructor(private actions$: Actions,
              private router: Router) {
  }
}
