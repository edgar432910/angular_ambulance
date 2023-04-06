import { Component, Input } from '@angular/core';

@Component({
  selector: 'amb-test',
  templateUrl: './test.component.html',
  styleUrls: [`./test.component.css`],
  // template: `<h1>{{ name01 }}</h1>`,
  //   template: 'Mi componente test',
  // styles: ['h1 {color:red}', 'table {color:green}'],
  // styles: ['h1 {color:red}', 'table {color:green}'],
})
export class TestComponent {
  @Input('title') titulo = 'app-test';

  name01 = 'sergio1';
  name02 = 'sergio2';
  name03 = 'sergio3';
  constructor() {
    setInterval(() => {
      this.name01 = `sergio` + Math.random();
      this.name02 = `sergio` + Math.random();
      this.name03 = `sergio` + Math.random();
    }, 1000);
  }
}
