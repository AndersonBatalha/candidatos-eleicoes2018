import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DadosAplicativoProvider } from '../../providers/dados-aplicativo/dados-aplicativo';
import { DetalhesCandidatoPage } from '../detalhes-candidato/detalhes-candidato';

/**
 * Generated class for the CandidatosPresidentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidatos-presidente',
  templateUrl: 'candidatos-presidente.html',
})
export class CandidatosPresidentePage {

  public candidatos: Array<any> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dadosProvider: DadosAplicativoProvider, 
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Carregando...',
    })
    loader.present()
    console.log('ionViewDidEnter CandidatosPresidentePage');
    this.getAll();
    loader.dismiss()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidatosPresidentePage');
  }

  getAll() {
    this.dadosProvider.CandidatosPresidente()
      .then((resultados: any[]) => {
        this.candidatos = resultados
      }).catch(
        (error) => { console.log('erro ' + error.message) }
      )
  }

  /**
   * detalhes
   */
  public detalhes(id: number) {
    this.navCtrl.push(DetalhesCandidatoPage, {pk: id})  
  }

}
