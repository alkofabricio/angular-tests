import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTaxasComponent } from './form-taxas.component';

describe('FormTaxasComponent', () => {
  let component: FormTaxasComponent;
  let fixture: ComponentFixture<FormTaxasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTaxasComponent]
    });
    fixture = TestBed.createComponent(FormTaxasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
