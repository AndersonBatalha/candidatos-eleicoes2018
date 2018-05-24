import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EstadosBrasileirosProvider } from '../../providers/estados-brasileiros/estados-brasileiros';

/*
 * Generated class for the ListaEstadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-estados',
  templateUrl: 'lista-estados.html',
})
export class ListaEstadosPage {

  protected estados: Array<string> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public estadosProvider: EstadosBrasileirosProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ListaEstadosPage');
    let loader = this.loadingCtrl.create({
      content: 'Carregando...',
    })
    loader.present()
    this.estadosProvider.listarEstados().subscribe(
      (sucesso) => {
        for (let i in sucesso) {
          this.estados.push(sucesso[i].nome);
        }
        this.estados.sort()
      },    
      (e) => { 
        console.error(e);
      },
    )
    console.log(this.estados);
    loader.dismiss()
  }

  public itemSelecionado(uf: String) {
    this.navCtrl.push('CandidatosGovernadorPage', {estado: uf})
  }
}
