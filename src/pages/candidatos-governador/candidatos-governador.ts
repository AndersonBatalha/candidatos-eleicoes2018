import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  public Estado: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Estado = this.navParams.get('estado')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidatosGovernadorPage');
  }

}
