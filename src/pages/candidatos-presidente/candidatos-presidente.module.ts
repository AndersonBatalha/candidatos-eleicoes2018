import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidatosPresidentePage } from './candidatos-presidente';
import { CandidatoComponent } from '../../components/candidato/candidato';

@NgModule({
  declarations: [
    CandidatosPresidentePage,
    CandidatoComponent,
  ],
  imports: [
    IonicPageModule.forChild(CandidatosPresidentePage),
  ],
})
export class CandidatosPresidentePageModule {}
