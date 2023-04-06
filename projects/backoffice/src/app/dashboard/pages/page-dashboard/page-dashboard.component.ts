import { Component, OnInit, Inject } from '@angular/core';
import { LayoutService } from '../../../config/services/layout.service';
import { ILayout } from '../../../config/interfaces/layout.interface';
import { AuthApplication } from '../../../core/application/auth.application';

@Component({
  selector: 'amb-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.css'],
})
export class PageDashboardComponent implements OnInit {
  statusUser = false;
  constructor(
    private layoutservice: LayoutService,
    @Inject(AuthApplication) private auth: AuthApplication
  ) {
    // const configLayout: ILayout = { header: true, menu: true };
    // layoutservice.configuration = configLayout;
  }

  ngOnInit(): void {
    this.statusUser = this.auth.isAutenticated;
  }
}
