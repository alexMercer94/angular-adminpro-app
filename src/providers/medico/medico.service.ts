import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { URL_SERVICES } from 'src/config/config';
import { EApi } from 'src/enums/api.enum';
import { Medico } from 'src/models/medico.model';
import Swal from 'sweetalert2';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  constructor(private http: HttpClient, private userService: UserService) {}

  /**
   * Get the next registers consulting the web service
   * @param desde Param to get the next number of registers
   */
  loadMedicos(desde: number = 0): Observable<IAllMedicos> {
    const URL = URL_SERVICES + `${EApi.getAllMedicos}${desde}`;
    return this.http.get(URL).pipe(tap((resp: IAllMedicos) => resp));
  }

  /**
   * Seach a medico consuting web service
   * @param termino String to use in order to search in web service
   */
  searchMedicos(termino: string): Observable<IMedico[]> {
    const URL = URL_SERVICES + `${EApi.searchSpecificCollection}medicos/${termino}`;
    return this.http.get(URL).pipe(map((res: ISearchMedicos) => res.medicos));
  }

  /**
   * Delete a medico consulting web service
   * @param id Medico's ID to delete in database
   */
  deleteMedico(id: string): Observable<IDeleteMedico> {
    const URL = URL_SERVICES + `${EApi.medicosServices}/${id}/?token=${this.userService.token}`;
    return this.http.delete(URL).pipe(tap((resp: IDeleteMedico) => resp));
  }

  /**
   * Get just a Medico consulting web service
   * @param id Medico's ID in order to search in database
   */
  loadMedico(id: string): Observable<IMedico> {
    const URL = URL_SERVICES + `${EApi.medicosServices}/${id}`;
    return this.http.get(URL).pipe(map((res: IGetMedico) => res.medico));
  }

  /**
   * Create or update a medico in database
   * @param medico Medico to create or update
   */
  createUpdateMedico(medico: Medico): Observable<IMedico> {
    let URL = URL_SERVICES + `${EApi.medicosServices}`;

    if (medico._id) {
      // Updating
      URL += `/${medico._id}/?token=${this.userService.token}`;

      return this.http.put(URL, medico).pipe(
        map((resp: ICreateUpdateMedico) => {
          Swal.fire({
            title: 'Médico actualizado',
            text: medico.name,
            type: 'success',
            confirmButtonText: 'OK'
          });
          return resp.medico;
        })
      );
    } else {
      // Creating
      URL += `/?token=${this.userService.token}`;

      return this.http.post(URL, medico).pipe(
        map((resp: ICreateUpdateMedico) => {
          Swal.fire({
            title: 'Médico creado',
            text: medico.name,
            type: 'success',
            confirmButtonText: 'OK'
          });
          return resp.medico;
        })
      );
    }
  }
}
