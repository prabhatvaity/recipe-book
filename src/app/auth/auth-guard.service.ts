import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<fromApp.AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth')
      .pipe(map((authState: fromAuth.State) => {
      return authState.authenticated;
    }));
  }
}
