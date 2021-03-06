import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { ModalUploadComponent } from '../modal-upload/modal-upload.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [RouterModule, CommonModule, PipesModule, TranslateModule],
  declarations: [BreadcrumsComponent, HeaderComponent, NopagefoundComponent, SidebarComponent, ModalUploadComponent],
  exports: [BreadcrumsComponent, HeaderComponent, NopagefoundComponent, SidebarComponent, ModalUploadComponent]
})
export class SharedModule {}
