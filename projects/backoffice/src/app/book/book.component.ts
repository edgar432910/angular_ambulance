import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'amb-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input('titleBook') title = 'Book';
  // @Input('authorBook') author = '';
  // nunca sera vacio
  @Input('authorBook') author!: string;
  @Input() idBook = 0;
  @Output() onDeleteBook = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  delete() {
    // console.log('deleteBook');
    // this.onDeleteBook.emit({ title: this.title, author: this.author });
    this.onDeleteBook.emit(this.idBook);
  }
}
