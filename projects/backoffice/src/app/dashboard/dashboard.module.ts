import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PageDashboardComponent],
  imports: [CommonModule, DashBoardRoutingModule],
})
export class DashboardModule {}
