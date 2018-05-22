import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DadosAplicativoProvider } from '../../providers/dados-aplicativo/dados-aplicativo';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public dadosProvider: DadosAplicativoProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.getAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidatosPresidentePage');
  }

  getAll() {
    this.dadosProvider.getCandidatosPresidente()
      .then((resultados: any[]) => {
        this.candidatos = resultados
      }).catch(
        (erro) => {'erro ' + erro.message}
      )
  }

}
