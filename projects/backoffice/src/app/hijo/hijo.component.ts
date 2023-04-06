import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../padre/padre.component';

@Component({
  selector: 'amb-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.css'],
})
export class HijoComponent implements OnInit {
  @Input('info') info = new Date();
  @Input() listUsers: Partial<User>[] = [];
  @Output('onNewMessage') onNewMessage = new EventEmitter();

  constructor() {
    setTimeout(() => {
      const infoUser = { name: 'Sergio', age: 40 };
      this.onNewMessage.emit(infoUser);
    }, 3000);
  }

  ngOnInit(): void {}
}
