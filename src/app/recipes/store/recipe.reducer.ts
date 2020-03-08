import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import {RecipeActions} from './recipe.actions';
import * as fromApp from '../../store/app.reducers';
export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}
const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ]
};
export function recipeReducer(state = initialState, action: RecipeActions) {
  switch (action.type) {
    case 'SET_RECIPES':
      return {
        ...state,
        recipes: [...action.payload]
      };
    case 'GET_RECIPES':
      return {
        ...state
      };
    case 'ADD_RECIPE':
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case 'UPDATE_RECIPE':
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case 'DELETE_RECIPE':
      const deletedRecipes = [...state.recipes];
      deletedRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: deletedRecipes
      };
    default:
      return state;
  }
}
