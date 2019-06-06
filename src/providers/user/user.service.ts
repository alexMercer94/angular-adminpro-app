import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/models/user.model';
import Swal from 'sweetalert2';
import { URL_SERVICES } from '../../config/config';
import { EApi } from '../../enums/api.enum';
import { UploadFilesService } from '../uploadFiles/upload-files.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;
  menu: IMenuItem[] = [];

  constructor(public http: HttpClient, private router: Router, public uploadFileService: UploadFilesService) {
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
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  /**
   * Save data in Local storage in order to persist session
   * @param id Data's id from service
   * @param token Data's token from service
   * @param user Data's user from service
   * @param menu Data's menu from service
   */
  saveInLocalStorage(id: string, token: string, user: User, menu: IMenuItem[]): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  /**
   * Finish session in the application
   */
  logOut(): void {
    this.user = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

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
        this.saveInLocalStorage(resp.id, resp.token, resp.user, resp.menu);
        console.log(resp);
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
        this.saveInLocalStorage(resp.id, resp.token, resp.user, resp.menu);
        return resp;
      }),
      catchError(err => {
        Swal.fire({
          title: 'Error!',
          text: err.error.message,
          type: 'error',
          confirmButtonText: 'OK'
        });
        return throwError(err);
      })
    );
  }

  /**
   * Updata a user in database consulting the service
   * @param user : User to update in database
   */
  updateUser(user: User): Observable<IUpdateUser> {
    const URL = URL_SERVICES + EApi.userServices + `/${user._id}?token=${this.token}`;
    return this.http.put(URL, user).pipe(
      tap((resp: IUpdateUser) => {
        let userDB: User;
        if (user._id === this.user._id) {
          userDB = resp.user;
          this.saveInLocalStorage(userDB._id, this.token, userDB, this.menu);
        }

        Swal.fire({
          title: 'Usuario Actualizado',
          text: user.name,
          type: 'success',
          confirmButtonText: 'OK'
        });

        return userDB;
      }),
      catchError(err => {
        Swal.fire({
          title: err.error.message,
          text: err.error.errors.message,
          type: 'error',
          confirmButtonText: 'OK'
        });
        return throwError(err);
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
      }),
      catchError(err => {
        Swal.fire({
          title: err.error.message,
          text: err.error.errors.message,
          type: 'error',
          confirmButtonText: 'OK'
        });
        return throwError(err);
      })
    );
  }

  /**
   * Change image consulting the web service
   * @param file File selected
   * @param id User's id to identify user in database
   */
  changeImage(file: File, id: string): void {
    this.uploadFileService
      .uploadFile(file, 'users', id)
      .then((resp: IUpdateImageUser) => {
        this.user.img = resp.user.img;
        Swal.fire({
          title: 'Imagen actualizada',
          text: this.user.name,
          type: 'success',
          confirmButtonText: 'OK'
        });

        this.saveInLocalStorage(id, this.token, this.user, this.menu);
      })
      .catch((resp: IUpdateImageUser) => {
        console.log(resp);
      });
  }

  /**
   * Get the next registers consulting the web service
   * @param desde Param to get the next number of registers
   */
  loadUsers(desde: number = 0): Observable<object> {
    const URL = URL_SERVICES + `${EApi.getAllUsers}${desde}`;
    return this.http.get(URL);
  }

  /**
   * Seach a user consuting web service
   * @param termino String to use in order to search in web service
   */
  searchUser(termino: string): Observable<IUser[]> {
    const URL = URL_SERVICES + `${EApi.searchSpecificCollection}users/${termino}`;
    return this.http.get(URL).pipe(map((res: ISearchUsers) => res.users));
  }

  /**
   * Delete a user consulting web service
   * @param id User's ID to delete in database
   */
  deleteUser(id: string): Observable<IDeleteUser> {
    const URL = URL_SERVICES + `${EApi.userServices}/${id}/?token=${this.token}`;
    return this.http.delete(URL).pipe(tap((resp: IDeleteUser) => resp));
  }
}
