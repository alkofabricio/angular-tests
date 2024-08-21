import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTaxasComponent } from './form-taxas.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CdkTableModule } from '@angular/cdk/table';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    FormTaxasComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  exports: [
    FormTaxasComponent
  ]
})
export class FormTaxasModule { }
