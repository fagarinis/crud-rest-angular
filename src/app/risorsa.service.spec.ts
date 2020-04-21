import { TestBed } from '@angular/core/testing';

import { RisorsaService } from './risorsa.service';

describe('RisorsaService', () => {
  let service: RisorsaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RisorsaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
