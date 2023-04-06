import { Component, OnInit } from '@angular/core';
import { MetaDataColumn } from '../../../shared/interfaces/metadatacolumn.interface';

@Component({
  selector: 'amb-page-histories',
  templateUrl: './page-histories.component.html',
  styleUrls: ['./page-histories.component.css'],
})
export class PageHistoriesComponent implements OnInit {
  metaData: MetaDataColumn[] = [
    { field: 'patient', header: 'Patient', sortable: false },
    { field: 'doctor', header: 'Doctor', sortable: false },
    { field: 'date', header: 'Date', sortable: false },
    { field: 'time', header: 'Time', sortable: false },
    { field: 'status', header: 'Status', sortable: false },
  ];

  listFields = ['patient', 'doctor', 'date', 'time', 'status'];
  data = [
    {
      patient: 'Jor',
      doctor: 'dr. jo',
      date: '19/1/1',
      time: '10',
      status: 'Pend',
    },
    {
      patient: 'Hansr',
      doctor: 'dr. Hans',
      date: '19/1/1',
      time: '10',
      status: 'Pend',
    },
    {
      patient: 'Hansr',
      doctor: 'dr. Hans',
      date: '19/1/1',
      time: '10',
      status: 'Pend',
    },
    {
      patient: 'Hansr',
      doctor: 'dr. Hans',
      date: '19/1/1',
      time: '10',
      status: 'Pend',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
