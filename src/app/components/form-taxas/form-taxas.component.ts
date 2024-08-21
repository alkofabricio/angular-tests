import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, debounceTime, map, Observable, of, Subject, take, takeUntil } from 'rxjs';
import { Taxa } from 'src/app/models/taxa.model';
import { TaxasService } from 'src/app/services/taxas.service';
import { FormTaxasValidators } from './form-taxas-validators';


/** TODO
 * Ao alterar valor, tem que calular proximo valor
 * Ao alterar valor, se for maior tem que apagar 
 * Deixar ultima linha e primeira linha com padrões
 * Validações de ordens decrescente e crescente
 * 
 * Se excluir
 */

@Component({
  selector: 'app-form-taxas',
  templateUrl: './form-taxas.component.html',
  styleUrls: ['./form-taxas.component.scss']
})
export class FormTaxasComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable) table!: MatTable<any>;

  formulario = this.formBuilder.group({
    taxas: this.formBuilder.array([]),
  });

  dataSource = new MatTableDataSource(this.getTaxas().controls);
  displayedColumns = ['descricao', 'proximoValor', 'valor', 'apagar'];

  destroy$ = new Subject();

  constructor(private formBuilder: FormBuilder,
    private taxasService: TaxasService
  ) { }

  // Inicializa comportamento do formulario
  ngOnInit(): void {
    this.formulario.get('taxas')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.table.renderRows();
      });
  }

  // Chama métodos do destroy para limpar subscriptions
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  // Método auxiliar que Retorna taxas do formulário
  getTaxas(): FormArray {
    return this.formulario.get('taxas') as FormArray;
  }

  // Adiciona linha na tabela
  adicionarLinha(groupForm = this.novoFormGroup()) {
    this.getTaxas().push(groupForm);
  }

  // Remove linha da tabela
  removerLinha(index: number) {
    this.getTaxas().removeAt(index);
  }

  // Simulando chamada do backend
  carregarTaxas() {
    this.taxasService.getTaxas()
      .pipe()
      .subscribe(taxas => {
        this.removerTodasLinhas();
        taxas.forEach(taxa => {
          const novoForm = this.novoFormGroup();
          novoForm.patchValue(taxa);
          this.adicionarLinha(novoForm);
        });
      });
  }

  calculaProximoValor(event: any, formIndex: any) {
    console.log(event);
    console.log(formIndex);
  }

  // Verifica se um determinado campo possui erro
  possuiErro(formGroup: FormGroup, controlName: string, erroName: string) {
    const control = formGroup.get(controlName);
    return control?.hasError(erroName);
  }

  // Remove todas as linhas do formulário
  removerTodasLinhas() {
    this.getTaxas().clear();
  }

  // Método responsável por construir um novo formgroup a uma nova linha
  private novoFormGroup() {
    const itemForm = new FormGroup({
      descricao: new FormControl({ value: '', disabled: false }, [Validators.required]),
      proximoValor: new FormControl({ value: 0, disabled: false }, [Validators.required]),
      valor: new FormControl({ value: 0, disabled: false }, [Validators.required]),
    });

    this.defineComportamentos(itemForm);
    this.defineAsyncValidators(itemForm);

    return itemForm;
  }

  private defineComportamentos(formGroup: FormGroup) {
    formGroup.get('valor')?.valueChanges.pipe(takeUntil(this.destroy$),
      debounceTime(500))
      .subscribe((value) => {
        this.taxasService.verificaValorDivisivel(value).pipe(take(1))
          .subscribe(isDivisivel => {
            if (isDivisivel) {
              formGroup.get('valor')?.setErrors({ divisor: true });
            }
          })
      });
  }

  private defineAsyncValidators(formGroup: FormGroup) {
    formGroup.get('valor')?.addAsyncValidators([
      this.validateMinLinha(),
      FormTaxasValidators.validateMin(formGroup.get('proximoValor')?.value || 0)
    ]);
    formGroup.get('valor')?.addAsyncValidators(this.validateMaxLinha());
  }

  private getMinValueFirstLine() {
    return this.getTaxas().length > 1 ? this.getTaxas().value[0].proximoValor : 0;
  }

  private getMaxValueLastLine() {
    return this.getTaxas().length > 1 ? this.getTaxas().value[this.getTaxas().length - 1].valor : 0;
  }

  validateMinLinha = () => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.value < this.getMinValueFirstLine() ? of({ minimoLinha: true }) : of(null);
    };
  }

  validateMaxLinha = () => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.value > this.getMaxValueLastLine() ? of({ maximoLinha: true }) : of(null);
    };
  }

  // Método responsável por validar formulário antes de seguir
  validaFormulario() {
    this.markAllAsTouched();
    const isValid = this.formulario.valid;
    if (!isValid) {
      alert("Formulário Taxas inválido")
    }
    return isValid;
  }

  // TODO: A ajustar ainda
  private markAllAsTouched() {
    // Object.keys(this.getTaxas().controls).map(c => this.markAll(this.getTaxas().get(c)));
    Object.keys(this.formulario.controls).map(c => this.formulario.get(c)?.markAsTouched());
    Object.keys(this.getTaxas().controls).map(c => console.log(c));
  }

  // TODO: A ajustar ainda
  private markAll(formGroup: FormGroup) {
    Object.keys(formGroup.controls).map(c => formGroup.get(c)?.markAllAsTouched);
  }

  // Auxiliar para printar valores
  logFormulario(): void {
    console.log(this.formulario);
    console.log(this.formulario.value)
  }
}
