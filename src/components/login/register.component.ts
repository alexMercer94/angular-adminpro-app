import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/providers/provider.index';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(public userService: UserService, public router: Router) {
    // Configure Form
    this.registerForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        // tslint:disable-next-line: max-line-length
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
          ])
        ),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
        conditions: new FormControl(false)
      },
      { validators: this.identicalPasswords('password', 'confirmPassword') }
    );

    this.registerForm.setValue({
      name: 'Test ',
      email: 'test@test.com',
      password: '123456',
      confirmPassword: '123456',
      conditions: true
    });
  }

  ngOnInit() {
    init_plugins();
  }

  /**
   * Consult User Servie in order to create a user
   */
  registerUser(): void {
    if (this.registerForm.invalid) {
      return;
    }

    if (!this.registerForm.value.conditions) {
      Swal.fire({
        title: 'Importante!',
        text: 'Debe aceptar las condiciones.',
        type: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    const user = new User(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password
    );

    this.userService.createUser(user).subscribe(resp => this.router.navigate(['/login']));
  }

  /**
   * Validator to evaluate the form control are identical
   * @param campo1 Password Form
   * @param campo2 ConfirmPass Form
   */
  identicalPasswords(campo1: string, campo2: string): ValidatorFn {
    return (group: FormGroup) => {
      const password = group.controls[campo1].value;
      const confirmPassword = group.controls[campo2].value;

      if (password === confirmPassword) {
        return null;
      }

      return {
        identicalPasswords: true
      };
    };
  }
}
