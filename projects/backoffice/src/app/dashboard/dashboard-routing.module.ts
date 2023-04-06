import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { AuthenticationGuard } from '../shared/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: PageDashboardComponent,
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DashBoardRoutingModule {}
