import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from 'src/providers/provider.index';

@Injectable({
  providedIn: 'root'
})
export class CanactivateVerifytokenGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(): Promise<boolean> | boolean {
    const token = this.userService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expired = this.expired(payload.exp);

    if (expired) {
      this.userService.logOut();
      return false;
    }

    return this.verifyRenew(payload.exp);
  }

  /**
   * Verify the token's expiration
   *  @param dateExp Payload expiration date
   */
  expired(dateExp: number): boolean {
    const now = new Date().getTime() / 1000;

    if (dateExp < now) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Verify token's expiration date and update it in order to renew it
   * @param dateExp Payload expiration date
   */
  verifyRenew(dateExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(dateExp * 1000);
      const now = new Date();

      now.setTime(now.getTime() + 1 * 60 * 60 * 1000);

      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this.userService.renewToken().subscribe(
          () => {
            resolve(true);
          },
          () => {
            reject(false);
            this.userService.logOut();
          }
        );
      }

      resolve(true);
    });
  }
}
