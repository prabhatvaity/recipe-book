import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  recipes: Recipe[] = [];
  recipesFetched = false;
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipesFetched = true;
          this.recipes = recipes;
        }
      );
    // from FireBase
    this.dataStorageService.fetchRecipes();
    // from Local
    // this.recipes = this.recipeService.getRecipes();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
