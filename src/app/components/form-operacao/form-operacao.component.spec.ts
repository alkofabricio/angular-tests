import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOperacaoComponent } from './form-operacao.component';

describe('FormOperacaoComponent', () => {
  let component: FormOperacaoComponent;
  let fixture: ComponentFixture<FormOperacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormOperacaoComponent]
    });
    fixture = TestBed.createComponent(FormOperacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
