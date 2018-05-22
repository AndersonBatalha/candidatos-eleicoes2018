import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CandidatosPresidentePageModule } from '../pages/candidatos-presidente/candidatos-presidente.module';
import { ListaEstadosPageModule } from '../pages/lista-estados/lista-estados.module';
import { EstadosBrasileirosProvider } from '../providers/estados-brasileiros/estados-brasileiros';
import { HttpClientModule } from '@angular/common/http';
import { CandidatosGovernadorPageModule } from '../pages/candidatos-governador/candidatos-governador.module';
import { DadosAplicativoProvider } from '../providers/dados-aplicativo/dados-aplicativo';
import { DetalhesCandidatoPageModule } from '../pages/detalhes-candidato/detalhes-candidato.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    CandidatosPresidentePageModule,
    ListaEstadosPageModule,
    CandidatosGovernadorPageModule,
    DetalhesCandidatoPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EstadosBrasileirosProvider,
    DadosAplicativoProvider,
  ]
})
export class AppModule {}
