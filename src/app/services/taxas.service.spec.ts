import { TestBed } from '@angular/core/testing';

import { TaxasService } from './taxas.service';

describe('TaxasService', () => {
  let service: TaxasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
