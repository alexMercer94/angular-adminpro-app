import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from 'src/providers/provider.index';

@Injectable({
  providedIn: 'root'
})
export class CanactivateAdminGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(): boolean {
    if (this.userService.user.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.userService.logOut();
      return false;
    }
  }
}
