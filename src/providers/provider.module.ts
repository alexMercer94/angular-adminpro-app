import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SettingsService, SharedService, SidebarService } from './provider.index';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SharedService, SettingsService, SidebarService]
})
export class ProviderModule {}
