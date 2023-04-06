// interfaces
export interface Book {
  title: string;
  author: string;
}
// type
export type Books = Book[];
// class
export class BookItem {
  constructor(public title: string, public author: string) {}
}
