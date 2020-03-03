import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import {Store} from '@ngrx/store';
import * as SLActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  constructor( private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }
  onEditItem(index: number) {
    this.store.dispatch(new SLActions.StartEdit(index));
  }
}
