import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'src/providers/provider.index';

@Injectable({
  providedIn: 'root'
})
export class CanactivateAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isLogIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
