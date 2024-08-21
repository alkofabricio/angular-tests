import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormOperacaoModule } from 'src/app/components/form-operacao/form-operacao.module';
import { FormTaxasModule } from 'src/app/components/form-taxas/form-taxas.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormOperacaoModule,
    FormTaxasModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
