import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import {Store} from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as SLActions from '../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  constructor( private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }
  onEditItem(index: number) {
    this.store.dispatch(new SLActions.StartEdit(index));
  }
}
