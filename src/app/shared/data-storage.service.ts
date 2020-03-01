import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  dbUrl = 'https://recipe-book-26353.firebaseio.com/recipes.json?auth=';
  constructor(private http: HttpClient, private recipeService: RecipeService,
              private  authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put(this.dbUrl + token, this.recipeService.getRecipes());
  }
  fetchRecipes() {
    const token = this.authService.getToken();
    return this.http.get<Recipe[]>(this.dbUrl + token)
      .subscribe(response => {
        const recipes: Recipe[] = response ? response : [];
        recipes.map(recipe => {
          recipe.ingredients = recipe.ingredients ? recipe.ingredients : [];
        });
        this.recipeService.setRecipes(recipes);
      });
  }
}
