import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadFilesService } from '../../providers/uploadFiles/upload-files.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imageUpload: File;
  tempImage: any;

  constructor(private uploadFileService: UploadFilesService, public modalUploadService: ModalUploadService) {}

  ngOnInit() {}

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
   * Upload image in order to change image of a user
   */
  uploadImage(): void {
    this.uploadFileService
      .uploadFile(this.imageUpload, this.modalUploadService.type, this.modalUploadService.id)
      .then((resp: IUpdateImage) => {
        this.modalUploadService.notification.emit(resp);
        this.closeModal();
      })
      .catch(err => {
        console.log('Error en la carga...');
      });
  }

  /**
   * Close modal
   */
  closeModal(): void {
    this.tempImage = null;
    this.imageUpload = null;
    this.modalUploadService.hideModal();
  }
}
