import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanactivateAuthGuard } from '../guards/canactivate-auth/canactivate-auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Charts1Component } from './charts1/charts1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [CanactivateAuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
      { path: 'charts1', component: Charts1Component, data: { title: 'Gráficas' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes del Tema' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil de Usuario' } },
      // Mantenimientos
      { path: 'users', component: UsersComponent, data: { title: 'Mantenimiento de Usuarios' } },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento de Hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento de Médicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { title: 'Actualizar Médico' } },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' } // Ruta cuando no existe ninguna ruta
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
