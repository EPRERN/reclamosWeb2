import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  @Input() isDisabled: boolean = true;
  @Input() emailValue: string = '';
  @Output() emailValueChange: EventEmitter<string> = new EventEmitter<string>();

  onEmailInput() {
    this.emailValueChange.emit(this.emailValue);
  }
}
