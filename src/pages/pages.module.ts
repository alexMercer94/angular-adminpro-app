import { NgModule } from '@angular/core';
import { SharedModule } from '../components/shared/shared.module';
import { Charts1Component } from './charts1/charts1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [DashboardComponent, ProgressComponent, Charts1Component, PagesComponent],
  exports: [DashboardComponent, ProgressComponent, Charts1Component, PagesComponent],
  imports: [SharedModule, PagesRoutingModule]
})
export class PagesModule {}
