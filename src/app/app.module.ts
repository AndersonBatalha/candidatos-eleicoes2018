import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CandidatosPresidentePageModule } from '../pages/candidatos-presidente/candidatos-presidente.module';
import { ListaEstadosPageModule } from '../pages/lista-estados/lista-estados.module';
import { EstadosBrasileirosProvider } from '../providers/estados-brasileiros/estados-brasileiros';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    CandidatosPresidentePageModule,
    ListaEstadosPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EstadosBrasileirosProvider,
  ]
})
export class AppModule {}
