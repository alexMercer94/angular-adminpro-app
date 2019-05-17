import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SettingsService, SharedService, SidebarService, UserService } from './provider.index';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [SharedService, SettingsService, SidebarService, UserService]
})
export class ProviderModule {}
