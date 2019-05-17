import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/models/user.model';
import Swal from 'sweetalert2';
import { URL_SERVICES } from '../../config/config';
import { EApi } from '../../enums/api.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;

  constructor(public http: HttpClient, private router: Router) {
    this.loadStorage();
  }

  /**
   * Know if there is a user session
   */
  isLogIn(): boolean {
    return this.token.length > 5 ? true : false;
  }

  /**
   * Get data from localstorage
   */
  loadStorage(): void {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  /**
   * Save data in Local storage in order to persist session
   * @param id Data's id from service
   * @param token Data's token from service
   * @param user Data's user from service
   */
  saveInLocalStorage(id: string, token: string, user: User): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  /**
   * Finish session in the application
   */
  logOut(): void {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

  /**
   * Consult service in order to get access to the application by google
   * @param token Token from google
   */
  loginGoogle(token: string): Observable<ILoginUserGoogle> {
    const URL = URL_SERVICES + EApi.getLoginGoogle;

    return this.http.post(URL, { token }).pipe(
      tap((resp: ILoginUserGoogle) => {
        this.saveInLocalStorage(resp.id, resp.token, resp.user);
        return true;
      })
    );
  }

  /**
   * Get access in order to login to the application
   */
  logIn(user: User, remember: boolean = false): Observable<ILoginUser> {
    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    const URL = URL_SERVICES + EApi.getLogin;
    return this.http.post(URL, user).pipe(
      tap((resp: ILoginUser) => {
        this.saveInLocalStorage(resp.id, resp.token, resp.user);
        return resp;
      })
    );
  }

  /**
   * Create user in database
   * @param user User to create
   */
  createUser(user: User): Observable<ICreateUser> {
    const URL = URL_SERVICES + EApi.userServices;

    return this.http.post(URL, user).pipe(
      tap((resp: ICreateUser) => {
        Swal.fire({
          title: 'Usuario creado',
          text: user.email,
          type: 'success',
          confirmButtonText: 'OK'
        });
        return resp.user;
      })
    );
  }
}
