import { Component, OnInit } from '@angular/core';
import { MetaDataColumn } from '../../../shared/interfaces/metadatacolumn.interface';
import { Sort } from '@angular/material/sort';
import { BaseComponent } from '../../../shared/classes/base-component';
import { UtilsServices } from '../../../helpers/services/utils.service';
import { DriverEntity } from '../../domain/entities/driver.entity';
import { DriverApplication } from '../../application/driver.application';
import { ResultPage } from '../../../shared/interfaces/result-page.interface';

@Component({
  selector: 'amb-page-drivers',
  templateUrl: './page-drivers.component.html',
  styleUrls: ['./page-drivers.component.css'],
})
export class PageDriversComponent extends BaseComponent implements OnInit {
  metaData: MetaDataColumn[] = [
    { field: 'nombre', header: 'Name', sortable: true },
  ];
  // subMetaData: MetaDataColumn[] = [
  //   { field: 'phone', header: 'Phone', sortable: true },
  //   { field: 'status', header: 'Status', sortable: true },
  //   { field: 'driverLicense', header: 'License', sortable: true },
  // ];
  listFields = [
    'name',
    'lastname',
    'email',
    'phone',
    'status',
    'driverLicense',
  ];
  data: DriverEntity[] = [];
  constructor(
    protected override utilsService: UtilsServices,
    private driverApplication: DriverApplication
  ) {
    super(utilsService);
  }

  ngOnInit(): void {
    this.getPage(0);
  }
  getPage(page: number): void {
    this.driverApplication
      .getPage(page)
      .subscribe((data: ResultPage<DriverEntity>) => {
        this.data = data.records;
      });
  }
  openForm(row: any = null) {
    // this.utilsService.showModal(FormComponent, {
    //   panelClass: `form-modal`,
    //   data: row,
    //   disableClose: true,
    // });
  }

  // changeSort(sort: Sort) {
  //   if (sort.active && sort.direction) {
  //     // this.data = this.data.sort
  //   }
  // }
}
