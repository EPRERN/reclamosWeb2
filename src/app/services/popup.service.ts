import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  togglePopup(isOpen: boolean): void {
    console.log('Toggling popup:', isOpen);
    this.isOpenSubject.next(isOpen);
  }
}
