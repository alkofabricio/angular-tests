import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";

export class FormTaxasValidators {
    static validateMin = (minValor: number) => {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            console.log(minValor)
            return control.value < minValor ? of({ minimo: true }) : of(null);
        };
    }

    static validateMax = (maxValor: number) => {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return control.value > maxValor ? of({ maximo: true }) : of(null);
        };
    }
}