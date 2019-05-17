import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/providers/provider.index';
import { User } from '../../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rememberMe = false;
  email: string;
  auth2: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    // Persistr el check en la Interfaz en caso de que haya un email en local storage
    if (this.email.length > 1) {
      this.rememberMe = true;
    }
  }

  /**
   * Initialize google auth library
   */
  googleInit(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        clien_id: '314460312314-3vfp9iuta7varv952qa4sjnk1s1rru8t.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      const elementHTML = document.getElementById('btnGoogle');
      this.attachSignin(elementHTML);
    });
  }

  /**
   * Login with goolgle using an HTML element
   * @param elemntHTML Html element to handle Auth
   */
  attachSignin(elemntHTML: HTMLElement): void {
    this.auth2.attachClickHandler(elemntHTML, {}, (googleUser: any) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this.userService.loginGoogle(token).subscribe((resp: ILoginUserGoogle) => (window.location.href = '#/dashboard'));
    });
  }

  /**
   * Consult sevice in order to get access to login
   * @param form Form with data
   */
  logIn(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const user = new User(null, form.value.email, form.value.password);
    this.userService
      .logIn(user, form.value.rememberme)
      .subscribe((resp: ILoginUser) => this.router.navigate(['/dashboard']));
  }
}
