import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService, MedicoService } from 'src/providers/provider.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitals: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');
  constructor(
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalUploadService: ModalUploadService
  ) {
    this.activatedRoute.params.subscribe(params => {
      const id = params[`id`];

      if (id !== 'new') {
        this.loadMedico(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.loadHospitals().subscribe((resp: IAllHospitals) => {
      this.hospitals = resp.hospitals;
    });

    this.modalUploadService.notification.subscribe((resp: IUpdateImageMedico) => {
      this.medico.img = resp.medico.img;
    });
  }

  /**
   * Create a new Medico and redirect to screen to edit that Medico
   * @param form Form to valida if it's valid
   */
  saveMedico(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.medicoService.createUpdateMedico(this.medico).subscribe((medico: IMedico) => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  /**
   * Get a hospital from service in order to get data for the component
   * @param id Hospital's ID in order to search in database
   */
  changeHospital(id: string): void {
    this.hospitalService.getHospital(id).subscribe((hospital: IHospital) => (this.hospital = hospital));
  }

  /**
   * Gte a medico consulting service
   * @param id Medico's ID to search in database
   */
  loadMedico(id: string) {
    this.medicoService.loadMedico(id).subscribe((medico: any) => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.changeHospital(this.medico.hospital);
    });
  }

  changeImage() {
    this.modalUploadService.showModal('medicos', this.medico._id);
  }
}
