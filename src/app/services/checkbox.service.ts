import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckboxService {

  
  private checkboxesState = new BehaviorSubject<boolean>(false);

  getCheckboxState() {
    return this.checkboxesState.asObservable();
  }

  setCheckboxState(value: boolean) {
    this.checkboxesState.next(value);
  }
}
