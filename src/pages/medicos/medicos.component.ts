import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/models/medico.model';
import { MedicoService, UserService } from 'src/providers/provider.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: IMedico[] = [];
  desde = 0;
  totalRegistros = 0;
  loading = true;
  constructor(private medicoService: MedicoService, private userService: UserService) {}

  ngOnInit() {
    this.loadMedicos();
  }

  /**
   * Load Hospital's data from web service in order to show in interface
   */
  loadMedicos(): void {
    this.loading = true;
    this.medicoService.loadMedicos(this.desde).subscribe((resp: IAllMedicos) => {
      this.medicos = resp.medicos;
      this.totalRegistros = resp.total;
      this.loading = false;
    });
  }

  /**
   * Consult web service in order to search a medico
   * @param termino String in order to search medico web service
   */
  searchMedico(termino: string): void {
    if (termino.length <= 0) {
      // this.loadUsers();
      return;
    }

    this.loading = true;
    this.medicoService.searchMedicos(termino).subscribe((medicos: IMedico[]) => {
      this.medicos = medicos;
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
    this.loadMedicos();
  }

  /**
   * Delete a Medico consulting web service
   * @param id Medico's ID to delete in database
   */
  deleteMedico(medico: Medico): void {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Estas a punto de borrar al Médico ${medico.name}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.medicoService.deleteMedico(medico._id).subscribe((resp: IDeleteMedico) => {
          this.loadMedicos();
          Swal.fire('Médico borrado!', 'El Médico ha sido eliminado correctamente.', 'success');
        });
      }
    });
  }

  /**
   * Edit properties of a medico and save it consulting web service
   * @param medico Medico to update properties in database
   */
  editMedico(medico: Medico): void {
    // this.hospitalService.updateHospital(hospital).subscribe();
  }
}
