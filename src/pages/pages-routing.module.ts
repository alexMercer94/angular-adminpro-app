import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanactivateAdminGuard } from '../guards/canactivate-admin/canactivate-admin.guard';
import { CanactivateVerifytokenGuard } from '../guards/canactivate-verifytoken/canactivate-verifytoken.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Charts1Component } from './charts1/charts1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SearchComponent } from './search/search.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanactivateVerifytokenGuard],
    data: { title: 'Dashboard' }
  },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
  { path: 'charts1', component: Charts1Component, data: { title: 'Gráficas' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes del Tema' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Perfil de Usuario' } },
  { path: 'search/:termino', component: SearchComponent, data: { title: 'Buscador' } },
  // Mantenimientos
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [CanactivateAdminGuard],
    data: { title: 'Mantenimiento de Usuarios' }
  },
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento de Hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento de Médicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { title: 'Actualizar Médico' } },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' } // Ruta cuando no existe ninguna ruta
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
