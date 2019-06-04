import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/config/config';
import { EApi } from 'src/enums/api.enum';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  constructor() {}

  /**
   * Upload a file consulting webservice
   * @param file File to upload in service
   * @param type Type of user to save image
   * @param id Id to save image in database
   */
  uploadFile(file: File, type: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      // Configure Form Data
      formData.append('image', file, file.name);

      // Configure the ajax request
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // console.log('Image uploaded');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }
        }
      };

      const url = URL_SERVICES + `${EApi.uploadImages}/${type}/${id}`;

      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
