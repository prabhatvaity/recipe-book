import { Component } from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {
  }
  onSaveData() {
    return this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }, (error => console.log(error))
      );
  }

  onFetchData() {
    return this.dataStorageService.fetchRecipes();
  }
}
