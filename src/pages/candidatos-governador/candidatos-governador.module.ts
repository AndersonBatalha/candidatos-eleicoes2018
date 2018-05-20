import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidatosGovernadorPage } from './candidatos-governador';

@NgModule({
  declarations: [
    CandidatosGovernadorPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidatosGovernadorPage),
  ],
})
export class CandidatosGovernadorPageModule {}
