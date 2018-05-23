import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public loadCtrl: LoadingController,
    public dadosAplicativo: DadosAplicativoProvider,
  ) {
    this.dados = this.navParams.data
    this.id = this.navParams.get('pk')
    this.Estado = this.navParams.get('uf')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesCandidatoPage');
    let loader = this.loadCtrl.create({
      content: 'Carregando...',
    })
    loader.present()
    if (this.Estado === undefined) {
      this.detalhesCandidatoPresidente()
    }
    else {
      this.detalhesCandidatoGovernador()
    }
    loader.dismiss()
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
