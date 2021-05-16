import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import * as SLActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  private subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  constructor( private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1) {
            this.editedItem = data.editedIngredient;
            this.editMode = true;
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
          } else {
            this.editMode = false;
          }
        });
  }

  onSubmit(form: NgForm) {
    const formValue = form.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new SLActions.UpdateIngredient({ ingredient: newIngredient }));
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new SLActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }
  ngOnDestroy() {
    this.store.dispatch(new SLActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new SLActions.DeleteIngredient());
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
