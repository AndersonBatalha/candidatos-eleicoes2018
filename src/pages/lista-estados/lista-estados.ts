import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public estadosProvider: EstadosBrasileirosProvider,
  ) {
    this.estadosProvider.listarEstados().subscribe(
      (sucesso) => {
        console.log(sucesso);
      },    
      (e) => { 
        console.error(e);
      },
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaEstadosPage');
  }

}
