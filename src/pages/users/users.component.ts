import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/providers/provider.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  desde = 0;
  totalRegistros = 0;
  loading = true;

  constructor(private usersService: UserService, public modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.loadUsers();
    // Cuando haya un  peticion de carga de imagen en el servicio se activara la notificación
    // permitiendo ejecutar la carga de usuarios de nuevo para mostrar los cambios
    this.modalUploadService.notification.subscribe(resp => {
      this.loadUsers();
    });
  }

  /**
   * Load user's data from web service in order to show in interface
   */
  loadUsers(): void {
    this.loading = true;
    this.usersService.loadUsers(this.desde).subscribe((resp: IAllUsers) => {
      this.users = resp.users;
      this.totalRegistros = resp.total;
      this.loading = false;
    });
  }

  /**
   * Changa value `desde` to get next registers from web service
   * @param value Value to decrease or increase number to get the next registers from web service
   */
  changeDesde(value: number): void {
    const desde = this.desde + value;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += value;
    this.loadUsers();
  }

  /**
   * Consult web service in order to search a user
   * @param termino String in order to search using web service
   */
  searchUser(termino: string): void {
    if (termino.length <= 0) {
      this.loadUsers();
      return;
    }

    this.loading = true;
    this.usersService.searchUser(termino).subscribe((users: IUser[]) => {
      this.users = users;
      this.loading = false;
    });
  }

  /**
   * Delete a user consulting web service
   * @param user User to delete
   */
  deleteUser(user: User): void {
    // Verificar si el usuario que desea eliminar es igual al usuario logeado
    if (user._id === this.usersService.user._id) {
      Swal.fire({
        title: 'No puede borrar usuario!',
        text: 'No se puede borrar a si mismo',
        type: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Estas a punto de borrar a ${user.name}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.usersService.deleteUser(user._id).subscribe((resp: IDeleteUser) => {
          this.loadUsers();
          Swal.fire('Usuario borrado!', 'El usuario ha sido eliminado correctamente.', 'success');
        });
      }
    });
  }

  /**
   * Change user role of a user and save it consulting web service
   * @param user User to update user role in database
   */
  saveUser(user: User): void {
    this.usersService.updateUser(user).subscribe();
  }

  /**
   * Show modal using service
   * @param id User's Id to user to change imaage
   */
  showModal(id: string): void {
    this.modalUploadService.showModal('users', id);
  }
}
