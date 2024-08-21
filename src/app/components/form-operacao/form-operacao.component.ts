import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-operacao',
  templateUrl: './form-operacao.component.html',
  styleUrls: ['./form-operacao.component.scss']
})
export class FormOperacaoComponent {
  formulario = new FormGroup({
    campo: new FormControl({ value: '', disabled: false }, [Validators.required])
  });

  logFormulario() {
    console.log(this.formulario.value);
    console.log(this.formulario.valid);
  }

  validaFormulario() {
    this.markAllAsTouched();
    const isValid = this.formulario.valid;
    if (!isValid) {
      alert("Formulário Operação inválido")
    }
    return isValid;
  }

  markAllAsTouched() {
    Object.keys(this.formulario.controls).map(c => this.formulario.get(c)?.markAsTouched());
  }
}
