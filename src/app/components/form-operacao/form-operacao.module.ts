import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormOperacaoComponent } from './form-operacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FormOperacaoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    FormOperacaoComponent
  ]
})
export class FormOperacaoModule { }
