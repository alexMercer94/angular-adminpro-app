import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/login/register.component';
import { NopagefoundComponent } from '../components/shared/nopagefound/nopagefound.component';
import { CanactivateAuthGuard } from '../guards/canactivate-auth/canactivate-auth.guard';
import { PagesComponent } from '../pages/pages.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: PagesComponent,
    canActivate: [CanactivateAuthGuard],
    loadChildren: '../pages/pages.module#PagesModule' // LazyLoad
  },
  { path: '**', component: NopagefoundComponent } // cualquies otra ruta que no este definida, muestre el componente pageNotFound
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
