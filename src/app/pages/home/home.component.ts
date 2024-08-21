import { Component, ViewChild } from '@angular/core';
import { FormOperacaoComponent } from 'src/app/components/form-operacao/form-operacao.component';
import { FormTaxasComponent } from 'src/app/components/form-taxas/form-taxas.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('formOperacao') formOperacao!: FormOperacaoComponent;
  @ViewChild('formTaxas') formTaxas!: FormTaxasComponent

  validarForm() {
    if (this.formOperacao.validaFormulario() && this.formTaxas.validaFormulario()) {
      alert('Formulários válidos');
    };
  }

}
