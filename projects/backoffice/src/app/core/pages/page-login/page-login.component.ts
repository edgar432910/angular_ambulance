import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../config/services/layout.service';
import { ILayout } from '../../../config/interfaces/layout.interface';
import { InactivityService } from '../../../config/services/inactivity.service';

@Component({
  selector: 'amb-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css'],
})
export class PageLoginComponent implements OnInit {
  constructor(
    private layoutservice: LayoutService,
    private inactivityService: InactivityService
  ) {
    const configLayout: ILayout = { header: false, menu: false };
    layoutservice.configuration = configLayout;
    inactivityService.stopWatching();
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    const configLayout: ILayout = { header: true, menu: true };
    this.layoutservice.configuration = configLayout;
  }
}
