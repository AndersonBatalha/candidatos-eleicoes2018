import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidatosPresidentePage } from './candidatos-presidente';

@NgModule({
  declarations: [
    CandidatosPresidentePage,
  ],
  imports: [
    IonicPageModule.forChild(CandidatosPresidentePage),
  ],
})
export class CandidatosPresidentePageModule {}
