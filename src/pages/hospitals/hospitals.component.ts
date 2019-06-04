import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/providers/provider.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {
  hospitals: Hospital[] = [];
  desde = 0;
  totalRegistros = 0;
  loading = true;

  constructor(private hospitalService: HospitalService, public modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.loadHospitals();
    // Cuando haya un  peticion de carga de imagen en el servicio se activara la notificación
    // permitiendo ejecutar la carga de usuarios de nuevo para mostrar los cambios
    this.modalUploadService.notification.subscribe(resp => {
      this.loadHospitals();
    });
  }

  /**
   * Load Hospital's data from web service in order to show in interface
   */
  loadHospitals(): void {
    this.loading = true;
    this.hospitalService.loadHospitals(this.desde).subscribe((resp: IAllHospitals) => {
      this.hospitals = resp.hospitals;
      this.totalRegistros = resp.total;
      this.loading = false;
    });
  }

  /**
   * Consult web service in order to search a user
   * @param termino String in order to search using web service
   */
  searchHospital(termino: string): void {
    if (termino.length <= 0) {
      // this.loadUsers();
      return;
    }

    this.loading = true;
    this.hospitalService.searchHospital(termino).subscribe((hospitals: IHospital[]) => {
      this.hospitals = hospitals;
      this.loading = false;
    });
  }

  /**
   * Show modal using service
   * @param id User's Id to user to change imaage
   */
  showModal(id: string): void {
    this.modalUploadService.showModal('hospitals', id);
  }

  /**
   * Delete a Hospital consulting web service
   * @param id Hospital's ID to delete in database
   */
  deleteHospital(hospital: Hospital): void {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Estas a punto de borrar el ${hospital.name}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.hospitalService.deleteHospital(hospital._id).subscribe((resp: IDeleteHospital) => {
          this.loadHospitals();
          Swal.fire('Hospital borrado!', 'El Hospital ha sido eliminado correctamente.', 'success');
        });
      }
    });
  }

  /**
   * Change name of a hospital and save it consulting web service
   * @param hospital Hospital to update name in database
   */
  updateHospital(hospital: Hospital): void {
    this.hospitalService.updateHospital(hospital).subscribe();
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
    this.loadHospitals();
  }

  /**
   * Crear a new hospital consulting service
   */
  createHospital(): void {
    Swal.fire({
      title: 'Crear Hospital',
      input: 'text',
      inputPlaceholder: 'Ingrese nombre del Hospital',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Cancelar',
      type: 'warning'
    }).then(result => {
      if (!result.value || result.value.length === 0) {
        return;
      }

      this.hospitalService.createHospital(result.value).subscribe((resp: ICreateHospital) => {
        this.loadHospitals();
      });
    });
  }
}
