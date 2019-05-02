import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from '../components/chart/chart.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { SharedModule } from '../components/shared/shared.module';
import { Charts1Component } from './charts1/charts1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Charts1Component,
    PagesComponent,
    IncrementadorComponent,
    ChartComponent
  ],
  exports: [DashboardComponent, ProgressComponent, Charts1Component, PagesComponent],
  imports: [FormsModule, SharedModule, ChartsModule, PagesRoutingModule]
})
export class PagesModule {}
