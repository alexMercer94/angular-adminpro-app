import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EApi } from 'src/enums/api.enum';
import { URL_SERVICES } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  medicos: IMedico[] = [];
  hospitals: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
    this.activatedRoute.params.subscribe(params => {
      const termino = params[`termino`];
      this.search(termino);
    });
  }

  ngOnInit() {}

  /**
   * Search `hospitals, medicos and users` using a term consulting web service
   * @param termino String to search in database
   */
  search(termino: string): void {
    const URL = URL_SERVICES + `${EApi.searchAllCollections}${termino}`;
    this.http.get(URL).subscribe((resp: ISearchAllCollections) => {
      this.hospitals = resp.hospitals;
      this.medicos = resp.medicos;
      this.users = resp.users;
    });
  }
}
