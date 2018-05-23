import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DadosAplicativoProvider } from '../../providers/dados-aplicativo/dados-aplicativo';
import { DetalhesCandidatoPage } from '../detalhes-candidato/detalhes-candidato';

/**
 * Generated class for the CandidatosGovernadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidatos-governador',
  templateUrl: 'candidatos-governador.html',
})
export class CandidatosGovernadorPage {

  public candidatos: any[];
  public Estado: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dadosProvider: DadosAplicativoProvider, 
    public loadingCtrl: LoadingController
  ) {
    this.Estado = this.navParams.get('estado')
  }

  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Carregando...',
    })
    loader.present()
    console.log('ionViewDidEnter CandidatosGovernadorPage');
    this.getAll();
    loader.dismiss()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidatosGovernadorPage');
  }

  getAll() {
    this.dadosProvider.CandidatosGovernador(this.Estado)
      .then((resultados: any[]) => {
        this.candidatos = resultados
      }).catch(
      (error) => { console.log('erro ' + error.message) }
      )
  }

  /**
 * detalhes
 */
  public detalhes(id: number, estado: string) {
    this.navCtrl.push(DetalhesCandidatoPage, { pk: id, uf: estado })
  }
  
}
