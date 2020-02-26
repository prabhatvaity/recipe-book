import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put('https://recipe-book-26353.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }
  fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipe-book-26353.firebaseio.com/recipes.json')
      .subscribe(response => {
        const recipes: Recipe[] = response ? response : [];
        recipes.map(recipe => {
          recipe.ingredients = recipe.ingredients ? recipe.ingredients : [];
        });
        this.recipeService.setRecipes(recipes);
      });
  }
}
