import { Component, OnInit } from '@angular/core';

export interface User {
  name: string;
  age: number;
  lastname: string;
}
export type TUser = User[]; // Array<User>
export type ab = {
  name: string;
};
export class User {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.ageAllowed(age);
    this.name = name;
    this.age = age;
  }
  ageAllowed(age: number) {
    if (age < 18) {
      throw new Error('Age min is 18');
    }
  }
}

@Component({
  selector: 'amb-padre',
  templateUrl: './padre.component.html',
  styleUrls: ['./padre.component.css'],
})
export class PadreComponent implements OnInit {
  currentDate = new Date();
  users: Partial<User>[] = [
    { name: 'Sergio', age: 40 },
    { name: 'Ed', age: 40 },
    { name: 'Rod', age: 40 },
  ];
  constructor() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
  ngOnInit(): void {}

  showAlert(msg: Partial<User>) {
    alert('message: ' + JSON.stringify(msg));
  }
}
