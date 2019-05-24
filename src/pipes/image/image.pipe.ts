import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { EApi } from '../../enums/api.enum';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform(image: string, type: string = 'user'): string {
    let URL = URL_SERVICES + EApi.getImage;

    // Verificar si existe una imagen
    if (!image) {
      return URL + `/${type}/undefined`;
    }

    // Verificar si es un imagen de Google
    if (image.indexOf('https') >= 0) {
      return image;
    }

    switch (type) {
      case 'user':
        URL += '/users/' + image;
        break;
      case 'medico':
        URL += '/medicos/' + image;
        break;
      case 'hospital':
        URL += '/hospitals/' + image;
        break;

      default:
        console.log('Tipo de imagen no existe');
        URL += `/${type}/undefined`;
        break;
    }
    return URL;
  }
}
