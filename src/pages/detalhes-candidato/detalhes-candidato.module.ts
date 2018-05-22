import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesCandidatoPage } from './detalhes-candidato';

@NgModule({
  declarations: [
    DetalhesCandidatoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesCandidatoPage),
  ],
})
export class DetalhesCandidatoPageModule {}
