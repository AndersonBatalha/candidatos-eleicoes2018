import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EstadosBrasileirosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//https://servicodados.ibge.gov.br/api/v1/localidades/estados

@Injectable()
export class EstadosBrasileirosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello EstadosBrasileirosProvider Provider');
  }

  public listarEstados() {
    return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  }
}
