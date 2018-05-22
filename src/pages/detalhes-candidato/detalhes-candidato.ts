import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DadosAplicativoProvider } from '../../providers/dados-aplicativo/dados-aplicativo';
import { Candidato, Governador } from '../../models/candidato';

/**
 * Generated class for the DetalhesCandidatoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-candidato',
  templateUrl: 'detalhes-candidato.html',
})
export class DetalhesCandidatoPage {

  public dados: any;
  public id: number;
  public Estado: string;
  public presidente = new Candidato();
  public governador = new Governador();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dadosAplicativo: DadosAplicativoProvider,
  ) {
    this.dados = this.navParams.data
    this.id = this.navParams.get('pk')
    this.Estado = this.navParams.get('uf')
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter DetalhesCandidatoPage');
    if (this.Estado === undefined) {
      console.log('presidente')
      this.detalhesCandidatoPresidente()

    }
    else {
      console.log('governador')
      this.detalhesCandidatoGovernador()
    }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesCandidatoPage');
  }

  public detalhesCandidatoPresidente() {
    this.dadosAplicativo.DetalhesCandidatoPresidente(this.id)
      .then((resultado: any) => {
        this.presidente = resultado
      }).catch(
        (error) => { console.log('erro ' + error.message) }
      )
  }

  public detalhesCandidatoGovernador() {
    this.dadosAplicativo.DetalhesCandidatoGovernador(this.id, this.Estado)
      .then((resultado: any) => {
        this.governador = resultado
      }).catch(
        (error) => { console.log('erro ' + error.message) }
      )
  }
}
