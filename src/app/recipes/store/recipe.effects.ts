import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducer';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';

@Injectable()
export class RecipeEffects {
  dbUrl = 'https://recipe-book-26353.firebaseio.com/recipes.json';
  @Effect()
  recipeFetch = this.action$
    .pipe(ofType(RecipeActions.FETCH_RECIPES))
    .pipe(switchMap((action: RecipeActions.FetchRecipes) => {
      return this.http.get<Recipe[]>(this.dbUrl, {observe: 'body', responseType: 'json'});
    }), map((recipes) => {
      for (const recipe of recipes) {
        recipe.ingredients = recipe.ingredients ? recipe.ingredients : [];
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    }));

  @Effect({dispatch: false})
  recipeStore = this.action$
    .pipe(ofType(RecipeActions.STORE_RECIPES))
    .pipe(
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', this.dbUrl, state.recipes);
        return this.http.request(req);
      }));
  constructor(private action$: Actions,
              private http: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}
