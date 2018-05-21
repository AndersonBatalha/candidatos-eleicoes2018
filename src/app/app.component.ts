import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DadosAplicativoProvider } from '../providers/dados-aplicativo/dados-aplicativo';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    dadosAplicativo: DadosAplicativoProvider,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      dadosAplicativo.apagarBanco()

      dadosAplicativo.criarBanco().then(() => {
          splashScreen.hide();
        }).catch(() => {
          splashScreen.hide();
        })

      });

    statusBar.styleDefault();
  }

}

