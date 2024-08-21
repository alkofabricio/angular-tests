import { Injectable } from '@angular/core';
import { Taxa } from '../models/taxa.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxasService {

  readonly taxas: Taxa[] = [
    { descricao: 'Teste', valor: 1 },
    { descricao: 'Taxa numero 2', valor: 2 },
    { descricao: 'Outra Descrição', valor: 3 },
  ]

  constructor() { }

  getTaxas(): Observable<Taxa[]> {
    return of(this.taxas);
  }

  verificaValorDivisivel(valor: number | null, divisor = 7) {
    console.log('Chamou service');
    return of(valor && valor % divisor === 0);
  }

  calculaProximoValor(valor: number) {
    return of(valor++);
  }
}
