import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from '../components/chart/chart.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { SharedModule } from '../components/shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Charts1Component } from './charts1/charts1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SearchComponent } from './search/search.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Charts1Component,
    IncrementadorComponent,
    ChartComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    MedicosComponent,
    MedicoComponent,
    SearchComponent
  ],
  exports: [DashboardComponent, ProgressComponent, Charts1Component],
  imports: [CommonModule, FormsModule, SharedModule, ChartsModule, TranslateModule, PagesRoutingModule, PipesModule]
})
export class PagesModule {}
