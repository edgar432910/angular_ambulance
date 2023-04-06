import { Component } from '@angular/core';
import { Book, BookItem } from './book/domain/book';
import { ILayout } from './config/interfaces/layout.interface';
import { LayoutService } from './config/services/layout.service';
import { LAYOUT_CONSTANTS } from './config/constants/layout.constant';
import { InactivityService } from './config/services/inactivity.service';
import { Router, NavigationEnd } from '@angular/router';
// books: Book[] = [
//   { title: 'el perfume', author: 'Patrick' },
//   { title: 'La ciudad', author: 'Mario' },
//   { title: 'El caballero carmelo', author: 'Abraham Baldelomar' },
// ];
// booksClass: BookItem[] = [
//   new BookItem('the lord', 'tolkiien'),
//   new BookItem('the lord2', 'tolkiien2'),
// ];

// deleteBook(idBook: number) {
//   // alert('Delete book: ' + book.title);
//   // alert('Delete book: ' + book.title);
//   this.books.splice(idBook, 1);
// }

// title = 'El perfume';
// author = 'Patric';
// getTitle() {
//   return this.title;
// }
@Component({
  selector: 'amb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  openSideNav = true;
  configLayout: ILayout = LAYOUT_CONSTANTS;
  startApp = false;
  tiemoutExceeded = false;
  constructor(
    private layoutService: LayoutService,
    private InactivityService: InactivityService,
    private router: Router
  ) {
    this.layoutService.configuration.subscribe((config: ILayout) => {
      this.configLayout = config;
    });
    // quiere oir cuando hay cambio de rutas,
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects != '/' && !this.startApp) {
          this.startApp = true;
          this.InactivityService.startWatching();
        }
      }
    });
    this.InactivityService.idleObservable().subscribe((status) => {
      this.tiemoutExceeded = status;
      console.log(`timeout exceeded`, status);
    });
  }
}
