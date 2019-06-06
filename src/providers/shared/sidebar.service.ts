import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: IMenuItem[] = [];

  constructor(private translateService: TranslateService, private userService: UserService) {}

  /**
   * Get menu from service
   */
  loadMenu() {
    this.menu = this.userService.menu;
  }
}
