import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaEstadosPage } from './lista-estados';

@NgModule({
  declarations: [
    ListaEstadosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaEstadosPage),
  ],
})
export class ListaEstadosPageModule {}
