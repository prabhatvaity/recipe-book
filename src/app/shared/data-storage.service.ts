import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  dbUrl = 'https://recipe-book-26353.firebaseio.com/recipes.json';
  constructor(private http: HttpClient, private recipeService: RecipeService,
              private  authService: AuthService) {
  }

  storeRecipes() {
    // const params = new HttpParams().set('auth', token);
    // return this.http.put(this.dbUrl, this.recipeService.getRecipes(),{
    //   observe: 'body',
    //   params: params
    // });

    // progress bar
    const req = new HttpRequest('PUT', this.dbUrl, this.recipeService.getRecipes(), {
      reportProgress: true
    });
    return this.http.request(req);
  }
  fetchRecipes() {
    return this.http.get<Recipe[]>(this.dbUrl)
      .subscribe(response => {
        const recipes: Recipe[] = response ? response : [];
        recipes.map(recipe => {
          recipe.ingredients = recipe.ingredients ? recipe.ingredients : [];
        });
        this.recipeService.setRecipes(recipes);
      });
  }
}
