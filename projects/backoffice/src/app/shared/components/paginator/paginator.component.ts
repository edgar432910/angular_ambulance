import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'amb-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  @Input() totalRecords = 0;
  @Input() currentPage = 0;
  @Output() onChangePage: EventEmitter<number> = new EventEmitter<number>();
  pageSize = environment.pageSize;
  totalPages = 0;
  constructor() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  ngOnInit(): void {}

  changePage(evt: PageEvent) {
    this.onChangePage.emit(evt.pageIndex);
  }
}
