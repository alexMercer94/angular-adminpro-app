import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EApi } from 'src/enums/api.enum';
import Swal from 'sweetalert2';
import { URL_SERVICES } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(private http: HttpClient, private userService: UserService) {}

  /**
   * Get the next registers consulting the web service
   * @param desde Param to get the next number of registers
   */
  loadHospitals(desde: number = 0): Observable<IAllHospitals> {
    const URL = URL_SERVICES + `${EApi.getAllHospitals}${desde}`;
    return this.http.get(URL).pipe(tap((resp: IAllHospitals) => resp));
  }

  /**
   * Seach a hospital consuting web service
   * @param termino String to use in order to search in web service
   */
  searchHospital(termino: string): Observable<IHospital[]> {
    const URL = URL_SERVICES + `${EApi.searchSpecificCollection}hospitals/${termino}`;
    return this.http.get(URL).pipe(map((res: ISearchHospitals) => res.hospitals));
  }

  /**
   * Updata a user in database consulting the service
   * @param user : User to update in database
   */
  updateHospital(hospital: Hospital): Observable<IUpdateHospital> {
    const URL = URL_SERVICES + EApi.hospitalServices + `/${hospital._id}?token=${this.userService.token}`;
    return this.http.put(URL, hospital).pipe(
      tap((resp: IUpdateHospital) => {
        Swal.fire({
          title: 'Hospital Actualizado',
          text: hospital.name,
          type: 'success',
          confirmButtonText: 'OK'
        });

        return resp.hospital;
      })
    );
  }

  /**
   * Delete a hospital consulting web service
   * @param id Hospital's ID to delete in database
   */
  deleteHospital(id: string): Observable<IDeleteHospital> {
    const URL = URL_SERVICES + `${EApi.hospitalServices}/${id}/?token=${this.userService.token}`;
    return this.http.delete(URL).pipe(tap((resp: IDeleteHospital) => resp));
  }

  /**
   * Get a Hospital by ID consulting web service
   * @param id Hospital's ID to get from database
   */
  getHospital(id: string): Observable<IHospital> {
    const URL = URL_SERVICES + `${EApi.hospitalServices}/${id}`;
    return this.http.get(URL).pipe(map((resp: IGetHospital) => resp.hospital));
  }

  /**
   * Create Hospital in database consulting web servide
   * @param hospitalName User to create
   */
  createHospital(hospitalName: string): Observable<ICreateHospital> {
    const URL = URL_SERVICES + `${EApi.hospitalServices}/?token=${this.userService.token}`;

    return this.http.post(URL, { name: hospitalName }).pipe(
      tap((resp: ICreateHospital) => {
        Swal.fire({
          title: 'Hospital creado!',
          text: hospitalName,
          type: 'success',
          confirmButtonText: 'OK'
        });
        return resp.hospital;
      })
    );
  }
}
