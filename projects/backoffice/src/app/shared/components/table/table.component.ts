import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { MetaDataColumn } from '../../interfaces/metadatacolumn.interface';
import { Sort } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'amb-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  @Output() onChangeSort: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Input() metaData: MetaDataColumn[] = [];
  @Input() subMetaData: MetaDataColumn[] = [];
  @Input() data: any = [
    { name: 'Ed', lastname: 'Perez' },
    { name: 'Ed-1', lastname: 'Perez' },
    { name: 'Ed-2', lastname: 'Perez' },
    { name: 'Ed-3', lastname: 'Perez' },
  ];
  widhtColumns = '';
  @ContentChildren(MatColumnDef, { descendants: true })
  columnsDef!: QueryList<MatColumnDef>;

  listFields: string[] = [];

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  constructor() {}

  ngOnInit(): void {}
  getField(): string[] {
    return this.metaData.map((el) => el.field);
  }

  changeSort(sort: Sort) {
    console.log(sort);
    this.onChangeSort.emit(sort);
  }
  getAdditionalFields(): string[] {
    this.widhtColumns =
      this.subMetaData.length > 0
        ? `1 1 ${100 / this.subMetaData.length}%`
        : '';
    return this.subMetaData.length > 0 ? ['details'] : [];
  }
  ngAfterContentInit(): void {
    if (!this.columnsDef) {
      return;
    }
    console.log(this.columnsDef);
    // se ha agregado desde fuera se ha agregado
    this.columnsDef.forEach((columnDef) => {
      this.listFields.push(columnDef.name);
      this.table?.addColumnDef(columnDef);
    });
  }
  // ver la entrada que ha cambiado, con ngOnChange
  ngOnChanges(changes: SimpleChanges) {
    if (changes['metaData']) {
      this.listFields = this.getField();
    }
  }
}
