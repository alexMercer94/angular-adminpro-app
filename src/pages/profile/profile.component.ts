import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/providers/provider.index';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User;
  imageUpload: File;
  tempImage: any;

  constructor(private userService: UserService) {
    this.user = this.userService.user;
  }

  ngOnInit() {}

  /**
   * Consult service to update an user
   * @param user User to update
   */
  save(user: User): void {
    this.user.name = user.name;

    // Si el usuario no es de Google, se permite actualizar el email
    if (!this.user.google) {
      this.user.email = user.email;
    }

    this.userService.updateUser(this.user).subscribe(resp => {
      console.log(resp);
    });
  }

  /**
   * Select an image to upload consulting the service
   * @param file File selected to upload
   */
  selectImage(file: File): void {
    if (!file) {
      this.imageUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Solo imágenes!',
        text: 'El archivo seleccionado no es una imágen.',
        type: 'error',
        confirmButtonText: 'OK'
      });
      this.imageUpload = null;
      return;
    }

    this.imageUpload = file;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);

    reader.onloadend = () => (this.tempImage = reader.result);
  }

  /**
   * Change user's image consulting the service
   */
  changeImage(): void {
    this.userService.changeImage(this.imageUpload, this.user._id);
  }
}
